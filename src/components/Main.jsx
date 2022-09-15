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

const MyFiltersParam = withDefault(ArrayParam, []);

export const Main = () => {
  const dispatch = useDispatch();

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

  const [searchValue, setSearchValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [query, setQuery] = useQueryParams({
    limit: NumberParam,
    offset: NumberParam,
    search: StringParam,
    filters: MyFiltersParam,
  });
  const { filters, limit, offset, search } = query;

  const handleChangePagination = (_, value) => {
    dispatch(setCurrentPage(value));
  };

  const handleChangeSelect = (event) => {
    dispatch(setLimit(event.target.value));
  };

  const handleChangeSearchFilter = (event) => {
    setSearchValue(event.target.value);
    setQuery({ search: event.target.value });

    const newItems = types.length
      ? items.filter((item) => item.name.includes(event.target.value))
      : itemsAll.filter((item) => item.name.includes(event.target.value));

    const resetItems = types.length ? itemsAllTypes : itemsAll;

    event.target.value
      ? dispatch(setItems(newItems))
      : dispatch(setItems(resetItems));
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
      dispatch(setItems(itemsAll));
    } else {
      const newItems = itemsTypes.filter((item) => item.type === type);
      dispatch(setItemsTypes(newItems));
    }

    dispatch(setSelectedTypes(event.target.value));
    setQuery({ filters: event.target.value });
  };

  const setItemsByTypes = () => {
    if (itemsTypes.length) {
      const newItems = [];

      for (let i = 0; i < itemsTypes.length; i++) {
        for (let j = 0; j < itemsTypes[i].items.length; j++) {
          newItems.push(itemsTypes[i].items[j]);
        }
      }

      dispatch(setItems(newItems));
      dispatch(setItemsAllTypes(newItems));
    }
  };

  useEffect(() => {
    !itemsAll.length &&
      dispatch(
        actionGetPokemons({
          endpoint: "pokemon",
          limit,
          offset,
        })
      );

    dispatch(actionGetPokemonsType({ endpoint: "type" }));
  }, []);

  useEffect(() => {
    if (limitState !== limit || offsetState !== offsetState) {
      dispatch(setItemsDisplay({ offsetState, limitState }));
      setQuery({ limit: limitState });
      setQuery({ offset: offsetState });
    }
  }, [limitState, offsetState]);

  useEffect(() => {
    setDisabled(itemsAll.length !== 100);
    next && itemsAll.length < 100 && dispatch(actionGetAllPokemons(next));
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
          count={countOfPages ? countOfPages : 0}
          disabled={disabled}
        />
        <SelectForm
          handleChange={handleChangeSelect}
          list={limits}
          value={limit}
          width="230px"
          label="Items to show per page"
          disabled={disabled}
        />
        <InputSearch
          label="Search by name"
          value={searchValue}
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
      {itemsDisplay.length ? (
        <PokemonList items={itemsDisplay} />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
