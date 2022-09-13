import React from "react";
import PropTypes from "prop-types";
import { FlexContainer, List } from "../styles/component";
import { PokemonCard } from "./PokemonCard";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { SelectForm } from "./SelectForm";

export const PokemonList = ({ items }) => {
  const countOfPages = useSelector((state) => state.pokemons.countOfPages);
  return (
    <>
      <FlexContainer>
        <Pagination count={countOfPages} />
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
