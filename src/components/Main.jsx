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
    count,
    countOfPages,
    currentPage,
  } = useSelector((state) => state.pokemons);

  const { types, selectedTypes, itemsTypes, itemsAllTypes } = useSelector(
    (state) => state.types
  );

  const [searchValue, setSearchValue] = useState(search);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(Boolean(search));

  const handleChangePagination = (_, value) => {
    dispatch(setCurrentPage(value));
  };

  const handleChangeSelect = (event) => {
    dispatch(setLimit(event.target.value));
  };

  const getSearchItems = (value, offset) => {
    const newItems = selectedTypes.length
      ? items.filter((item) => item.name.includes(value))
      : itemsAll.filter((item) => item.name.includes(value));

    const resetItems = selectedTypes.length ? itemsAllTypes : itemsAll;

    value
      ? dispatch(setItems({ data: newItems, offset }))
      : dispatch(setItems({ data: resetItems, offset }));
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
    }

    dispatch(setSelectedTypes(event.target.value));
    setQuery({ filters: event.target.value });
  };

  const getStartFilterTypes = (filters) => {
    for (let i = 0; i < filters.length; i++) {
      const item = types.filter((item) => filters[i] === item.name)[0];
      dispatch(
        actionGetPokemonsAccordingTypes({ url: item.url, type: item.name })
      );
    }

    console.log(offsetState);
  };

  const setItemsByTypes = () => {
    console.log(itemsTypes);
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
        actionGetPokemons({
          endpoint: "pokemon",
          limit,
        })
      );

    dispatch(actionGetPokemonsType({ endpoint: "type" }));
    filters && dispatch(setSelectedTypes(filters));
  }, []);

  useEffect(() => {
    if (limitState !== limit || offsetState !== offset) {
      dispatch(setItemsDisplay({ offsetState, limitState }));
      setQuery({ limit: limitState });
      setQuery({ offset: offsetState });
    }
  }, [limitState, offsetState]);

  useEffect(() => {
    setDisabled(itemsAll.length !== count);
    setIsLoading(itemsAll.length !== count);
    itemsAll.length >= count && search && getSearchItems(search, offset);
    console.log(filters);
    itemsAll.length >= count && filters && getStartFilterTypes(filters);
    next && itemsAll.length < count && dispatch(actionGetAllPokemons(next));
  }, [next]);

  useEffect(() => {
    setItemsByTypes();
  }, [itemsTypes]);

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
          value={limitState}
          width="230px"
          label="Items to show per page"
          disabled={disabled}
        />
        <InputSearch
          label="Search by name"
          value={searchValue || ""}
          handleChange={handleChangeSearchFilter}
          disabled={disabled}
        />
        <SelectForm
          handleChange={handleChangeSelectFilter}
          list={types}
          value={selectedTypes}
          width="230px"
          label="Filter by types"
          disabled={disabled}
          multiple={true}
        />
      </FlexContainer>
      {isLoading ? <CircularProgress /> : <PokemonList items={itemsDisplay} />}
    </>
  );
};
