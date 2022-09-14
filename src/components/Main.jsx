import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setSelectedTypes } from "../store/slices/typesSlice";
import { FlexContainer } from "../styles/component";
import { InputSearch } from "./InputSearch";
import { PokemonList } from "./PokemonList";
import { SelectForm } from "./SelectForm";

export const Main = () => {
  const dispatch = useDispatch();

  const itemsDisplay = useSelector((state) => state.pokemons.itemsDisplay);
  const itemsAll = useSelector((state) => state.pokemons.itemsAll);
  const next = useSelector((state) => state.pokemons.next);
  const limit = useSelector((state) => state.pokemons.limit);
  const offset = useSelector((state) => state.pokemons.offset);
  // const count = useSelector((state) => state.pokemons.count);
  const countOfPages = useSelector((state) => state.pokemons.countOfPages);
  const currentPage = useSelector((state) => state.pokemons.currentPage);
  const types = useSelector((state) => state.types.types);
  const itemsTypes = useSelector((state) => state.types.items);
  const selectedTypes = useSelector((state) => state.types.selectedTypes);

  const [searchValue, setSearchValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChangePagination = (_, value) => {
    dispatch(setCurrentPage(value));
  };

  const handleChangeSelect = (event) => {
    dispatch(setLimit(event.target.value));
  };

  const handleChangeSearchFilter = (event) => {
    setSearchValue(event.target.value);

    const newItems = itemsAll.filter((item) =>
      item.name.includes(event.target.value)
    );

    event.target.value
      ? dispatch(setItems(newItems))
      : dispatch(setItems(itemsAll));
  };

  const handleChangeSelectFilter = (event) => {
    const type = event.target.value[event.target.value.length - 1];

    if (event.target.value.length > selectedTypes.length) {
      const searchType = types.filter((item) => {
        return item.name === type;
      })[0];

      dispatch(actionGetPokemonsAccordingTypes({ url: searchType.url, type }));
    } else {
      console.log(itemsTypes); //TODO: add removing items
      console.log(1);
    }

    dispatch(setSelectedTypes(event.target.value));
  };

  const setItemsByTypes = () => {
    console.log(itemsTypes);

    const newItems =
      itemsTypes.length && itemsTypes[itemsTypes.length - 1].items;
    itemsTypes.length && dispatch(setItems(newItems));
  };

  useEffect(() => {
    !itemsAll.length &&
      dispatch(actionGetPokemons({ endpoint: "pokemon", limit, offset }));

    dispatch(actionGetPokemonsType({ endpoint: "type" }));
  }, []);

  useEffect(() => {
    dispatch(setItemsDisplay({ offset, limit }));
  }, [limit, offset]);

  useEffect(() => {
    setDisabled(itemsAll.length !== 50);
    next && itemsAll.length < 50 && dispatch(actionGetAllPokemons(next));
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
