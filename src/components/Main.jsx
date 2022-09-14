/*eslint-disable*/
import { CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { limits } from "../constants";
import { actionGetPokemons } from "../store/asyncActions";
import { setCurrentPage, setLimit } from "../store/slices/pokemonsSlice";
import { FlexContainer } from "../styles/component";
import { InputSearch } from "./InputSearch";
import { PokemonList } from "./PokemonList";
import { SelectForm } from "./SelectForm";

export const Main = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.pokemons.items);
  const limit = useSelector((state) => state.pokemons.limit);
  const offset = useSelector((state) => state.pokemons.offset);
  const countOfPages = useSelector((state) => state.pokemons.countOfPages);
  const currentPage = useSelector((state) => state.pokemons.currentPage);

  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChangePagination = (_, value) => {
    dispatch(setCurrentPage(value));
  };

  const handleChangeSelect = (event) => {
    dispatch(setLimit(event.target.value));
  };

  const handleChangeSearchFilter = (event) => {
    setSearchValue(event.target.value);
    const newItems = items.filter((item) =>
      item.name.includes(event.target.value)
    );
    event.target.value ? setSearchList(newItems) : setSearchList([]);
  };

  useEffect(() => {
    dispatch(actionGetPokemons({ endpoint: "pokemon", limit, offset }));
  }, [limit, offset]);

  return items.length ? (
    <>
      <FlexContainer>
        <Pagination
          onChange={handleChangePagination}
          page={currentPage}
          count={countOfPages}
        />
        <SelectForm
          handleChange={handleChangeSelect}
          list={limits}
          limit={limit}
          width="230px"
          label="Items to show per page"
        />
        <InputSearch
          label="Search by name"
          value={searchValue}
          handleChange={handleChangeSearchFilter}
        />
      </FlexContainer>
      <PokemonList items={items} />
    </>
  ) : (
    <CircularProgress />
  );
};
