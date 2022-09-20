import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";
import { limits } from "../constants";
import {
  actionGetAllPokemons,
  actionGetPokemons,
  actionGetPokemonsAccordingTypes,
  actionGetPokemonsType,
} from "../store/asyncActions";
import {
  setCurrentPage,
  setItems,
  setItemsDisplay,
  setLimit,
} from "../store/slices/pokemonsSlice";
import {
  reset,
  setItemsAllTypes,
  setItemsTypes,
  setSelectedTypes,
} from "../store/slices/typesSlice";
import {
  MenuItemPropsFilter,
  MenuPropsFilter,
  MenuPropsLimit,
  stylesInput,
  stylesSelectForm,
} from "../styles";
import { Pagination, Skeleton } from "@mui/material";
import {
  FilterContainer,
  FlexContainer,
  Typography,
} from "../styles/component";
import { InputSearch } from "./InputSearch";
import { PokemonList } from "./PokemonList";
import { SelectForm } from "./SelectForm";
import { useDebounce } from "../hooks/useDebounce";

const FiltersParam = withDefault(ArrayParam, []);

export const Main = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useQueryParams({
    limit: NumberParam,
    offset: NumberParam,
    search: StringParam,
    filters: FiltersParam,
  });
  const { filters, limit, offset, search } = query;

  const {
    itemsDisplay,
    itemsAll,
    items,
    next,
    limitState,
    offsetState,
    count,
    countOfPages,
    currentPage,
  } = useSelector((state) => state.pokemons);

  const { types, selectedTypes, itemsTypes, itemsAllTypes } = useSelector(
    (state) => state.types
  );

  const [searchValue, setSearchValue] = useState(search ? search : "");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(
    Boolean(offset || limit || filters || search)
  );

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const handleChangePagination = (_, value) => {
    dispatch(setCurrentPage(value));
    setQuery({ offset: value * limitState - limitState });
  };

  const handleChangeSelect = (event) => {
    dispatch(setLimit(event.target.value));
    setQuery({ limit: event.target.value });
    setQuery({ offset: 0 });
  };

  const getSearchItems = (value, offset) => {
    const newItems = selectedTypes.length
      ? itemsAllTypes.filter((item) => item.name.includes(value))
      : itemsAll.filter((item) => item.name.includes(value));

    const resetItems = selectedTypes.length ? itemsAllTypes : itemsAll;

    value
      ? dispatch(setItems({ data: newItems, offset }))
      : dispatch(setItems({ data: resetItems, offset }));

    !offset && setQuery({ offset: 0 });
  };

  const handleChangeSearchFilter = (event) => {
    setIsLoading(true);
    setSearchValue(event.target.value);
  };

  const getDataFromSearchFilter = (value) => {
    setQuery({ search: value });
    getSearchItems(value, 0);
  };

  const handleChangeSelectFilter = (event) => {
    setIsLoading(true);
    setDisabled(true);
    const type = event.target.value[event.target.value.length - 1];

    if (event.target.value.length > selectedTypes.length) {
      const searchType = types.filter((item) => item.name === type)[0];

      dispatch(actionGetPokemonsAccordingTypes({ url: searchType.url, type }));
    } else if (!type) {
      dispatch(reset());
      dispatch(setItems({ data: itemsAll, offset: 0 }));
    } else {
      let removeType = "";

      for (let i = 0; i < itemsTypes.length; i++) {
        if (!event.target.value.includes(itemsTypes[i].type))
          removeType = itemsTypes[i].type;
      }

      const newItems = itemsTypes.filter((item) => item.type !== removeType);

      dispatch(setItemsTypes(newItems));
      dispatch(setCurrentPage(1));
      setQuery({ offset: 0 });
    }

    dispatch(setSelectedTypes(event.target.value));
    setQuery({ filters: event.target.value });
  };

  const getStartFilterTypes = (filters) => {
    if (filters.length !== selectedTypes.length) {
      for (let i = 0; i < filters.length; i++) {
        const item = types.filter((item) => filters[i] === item.name)[0];
        dispatch(
          actionGetPokemonsAccordingTypes({ url: item.url, type: item.name })
        );
      }
      dispatch(setSelectedTypes(filters));
    }
  };

  const setItemsByTypes = () => {
    if (itemsTypes.length) {
      const newItems = [];

      for (let i = 0; i < itemsTypes.length; i++) {
        for (let j = 0; j < itemsTypes[i].items.length; j++) {
          newItems.push(itemsTypes[i].items[j]);
        }
      }

      dispatch(setItems({ data: newItems, offset }));
      dispatch(setItemsAllTypes(newItems));
    }
  };

  useEffect(() => {
    !itemsAll.length &&
      dispatch(
        actionGetPokemons({ endpoint: "pokemon", limitState, offsetState })
      );

    dispatch(actionGetPokemonsType({ endpoint: "type" }));
  }, []);

  useEffect(() => {
    dispatch(
      setItemsDisplay({
        offsetState: offset ? offset : offsetState,
        limitState: limit ? limit : limitState,
      })
    );
  }, [limitState, offsetState, items]);

  useEffect(() => {
    if (itemsAll.length) {
      setDisabled(itemsAll.length !== count);
      setIsLoading(itemsAll.length !== count);

      itemsAll.length >= count &&
        search &&
        !filters.length &&
        getSearchItems(search, offset);
      itemsAll.length >= count && filters && getStartFilterTypes(filters);
      next && itemsAll.length < count && dispatch(actionGetAllPokemons(next));
    }
  }, [next]);

  useEffect(() => {
    setItemsByTypes();
  }, [itemsTypes]);

  useEffect(() => {
    itemsAll.length >= count && search && getSearchItems(search, offset);
  }, [itemsAllTypes]);

  useEffect(() => {
    if (itemsAll.length) {
      setDisabled(itemsAll.length !== count);
      setIsLoading(itemsAll.length !== count);
    }
  }, [itemsDisplay, itemsTypes]);

  useEffect(() => {
    getDataFromSearchFilter(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <>
      <FilterContainer>
        <SelectForm
          handleChange={handleChangeSelect}
          list={limits}
          value={limit ? limit : limitState}
          width="230px"
          label="Items to show per page"
          disabled={disabled}
          MenuProps={MenuPropsLimit}
          styles={stylesSelectForm}
        />

        <InputSearch
          label="Search by name"
          value={searchValue}
          handleChange={handleChangeSearchFilter}
          disabled={disabled}
          styles={stylesInput}
        />

        <SelectForm
          handleChange={handleChangeSelectFilter}
          list={types}
          value={filters ? filters : selectedTypes}
          width="230px"
          label="Filter by types"
          disabled={disabled}
          multiple={true}
          MenuProps={MenuPropsFilter}
          MenuItemProps={MenuItemPropsFilter}
          styles={stylesSelectForm}
        />

        <FlexContainer>
          {isLoading ? (
            <Skeleton variant="rounded" width="260px" height="26px" />
          ) : (
            countOfPages > 1 && (
              <Pagination
                onChange={handleChangePagination}
                page={currentPage}
                count={countOfPages}
                disabled={disabled}
                size="small"
              />
            )
          )}
        </FlexContainer>
      </FilterContainer>
      <PokemonList
        items={itemsDisplay}
        isLoading={isLoading}
        limit={limitState}
      />
      {!itemsDisplay.length && !isLoading && (
        <FlexContainer justifyContent="center" sx={{ height: "300px" }}>
          <Typography variant="h3" component="span" sx={{ mt: 3 }}>
            Not found items. Change filters
          </Typography>
        </FlexContainer>
      )}
    </>
  );
};
