import React from "react";
import PropTypes from "prop-types";
import { FlexContainer, List } from "../styles/component";
import { PokemonCard } from "./PokemonCard";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SelectForm } from "./SelectForm";
import { setCurrentPage } from "../store/slices/pokemonsSlice";

export const PokemonList = ({ items }) => {
  const dispatch = useDispatch();
  const countOfPages = useSelector((state) => state.pokemons.countOfPages);
  const currentPage = useSelector((state) => state.pokemons.currentPage);

  const handleChange = (_, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <>
      <FlexContainer>
        <Pagination
          onChange={handleChange}
          page={currentPage}
          count={countOfPages}
        />
        <SelectForm />
      </FlexContainer>
      <List>
        {items.map((item) => (
          <PokemonCard key={item.name} item={item} />
        ))}
      </List>
    </>
  );
};

PokemonList.propTypes = {
  items: PropTypes.array,
};
