import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { limits } from "../constants";
import { actionGetAllPokemons, actionGetPokemons } from "../store/asyncActions";
import {
  setCurrentPage,
  setItems,
  setItemsDisplay,
  setLimit,
} from "../store/slices/pokemonsSlice";
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
  const count = useSelector((state) => state.pokemons.count);
  const countOfPages = useSelector((state) => state.pokemons.countOfPages);
  const currentPage = useSelector((state) => state.pokemons.currentPage);

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

  useEffect(() => {
    !itemsAll.length &&
      dispatch(actionGetPokemons({ endpoint: "pokemon", limit, offset }));
  }, []);

  useEffect(() => {
    dispatch(setItemsDisplay({ offset, limit }));
  }, [limit, offset]);

  useEffect(() => {
    setDisabled(itemsAll.length !== count);
    next && itemsAll.length < count && dispatch(actionGetAllPokemons(next));
  }, [next]);

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
          limit={limit}
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
      </FlexContainer>
      {itemsDisplay.length ? (
        <PokemonList items={itemsDisplay} />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
