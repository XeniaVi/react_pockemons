/*eslint-disable*/
import { CircularProgress, Pagination } from "@mui/material";
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
import { FlexContainer } from "../styles/component";
import { InputSearch } from "./InputSearch";
import { PokemonList } from "./PokemonList";
import { SelectForm } from "./SelectForm";

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
    // count,
    countOfPages,
    currentPage,
  } = useSelector((state) => state.pokemons);

  const count = 100;

  const { types, selectedTypes, itemsTypes, itemsAllTypes } = useSelector(
    (state) => state.types
  );

  const [searchValue, setSearchValue] = useState("");
  const [disabled, setDisabled] = useState(true);

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
    console.log("getSearchItems");
    const newItems = selectedTypes.length
      ? itemsAllTypes.filter((item) => item.name.includes(value))
      : itemsAll.filter((item) => item.name.includes(value));

    const resetItems = selectedTypes.length ? itemsAllTypes : itemsAll;

    console.log(items);
    console.log(itemsAllTypes);
    console.log(newItems);
    console.log(selectedTypes);
    console.log(value);
    console.log(offset);

    value
      ? dispatch(setItems({ data: newItems, offset }))
      : dispatch(setItems({ data: resetItems, offset }));

    !offset && setQuery({ offset: 0 });
  };

  const handleChangeSearchFilter = (event) => {
    setSearchValue(event.target.value);
    setQuery({ search: event.target.value });
    getSearchItems(event.target.value, 0);
  };

  const handleChangeSelectFilter = (event) => {
    const type = event.target.value[event.target.value.length - 1];

    if (event.target.value.length > selectedTypes.length) {
      const searchType = types.filter((item) => {
        return item.name === type;
      })[0];

      dispatch(actionGetPokemonsAccordingTypes({ url: searchType.url, type }));
    } else if (!type) {
      dispatch(reset());
      dispatch(setItems({ data: itemsAll, offset: 0 }));
    } else {
      const newItems = itemsTypes.filter((item) => item.type === type);
      dispatch(setItemsTypes(newItems));
      dispatch(setCurrentPage(1));
      setQuery({ offset: 0 });
    }

    dispatch(setSelectedTypes(event.target.value));
    setQuery({ filters: event.target.value });
  };

  const getStartFilterTypes = (filters) => {
    console.log("getStartFilterTypes");
    for (let i = 0; i < filters.length; i++) {
      const item = types.filter((item) => filters[i] === item.name)[0];
      dispatch(
        actionGetPokemonsAccordingTypes({ url: item.url, type: item.name })
      );
    }
    dispatch(setSelectedTypes(filters));
  };

  const setItemsByTypes = () => {
    if (itemsTypes.length) {
      const newItems = [];

      for (let i = 0; i < itemsTypes.length; i++) {
        for (let j = 0; j < itemsTypes[i].items.length; j++) {
          newItems.push(itemsTypes[i].items[j]);
        }
      }

      console.log(newItems);

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
    setDisabled(itemsAll.length !== count);
    itemsAll.length >= count &&
      search &&
      !filters &&
      getSearchItems(search, offset);
    itemsAll.length >= count && filters && getStartFilterTypes(filters);
    next && itemsAll.length < count && dispatch(actionGetAllPokemons(next));
  }, [next]);

  useEffect(() => {
    setItemsByTypes();
  }, [itemsTypes]);

  useEffect(() => {
    itemsAll.length >= count && search && getSearchItems(search, offset);
  }, [itemsAllTypes]);

  return (
    <>
      <FlexContainer>
        <Pagination
          onChange={handleChangePagination}
          page={currentPage}
          count={countOfPages}
          disabled={disabled}
        />
        <SelectForm
          handleChange={handleChangeSelect}
          list={limits}
          value={limit ? limit : limitState}
          width="230px"
          label="Items to show per page"
          disabled={disabled}
        />
        <InputSearch
          label="Search by name"
          value={search ? search : searchValue}
          handleChange={handleChangeSearchFilter}
          disabled={disabled}
        />
        <SelectForm
          handleChange={handleChangeSelectFilter}
          list={types}
          value={filters ? filters : selectedTypes}
          width="230px"
          label="Filter by types"
          disabled={disabled}
          multiple={true}
        />
      </FlexContainer>
      {itemsDisplay.length ? (
        <PokemonList items={itemsDisplay} />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
