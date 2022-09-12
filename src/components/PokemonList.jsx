import React from "react";
import PropTypes from "prop-types";
import { CustomLink, List } from "../styles/component";
import { PokemonCard } from "./PokemonCard";

export const PokemonList = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <CustomLink key={item.name} to={`/pokemon/${item.name}`}>
          <PokemonCard item={item} />
        </CustomLink>
      ))}
    </List>
  );
};

PokemonList.propTypes = {
  items: PropTypes.array,
};
