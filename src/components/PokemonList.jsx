import React from "react";
import PropTypes from "prop-types";
import { List } from "../styles/component";
import { PokemonCard } from "./PokemonCard";

export const PokemonList = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <PokemonCard key={item.id} item={item} />
      ))}
    </List>
  );
};

PokemonList.propTypes = {
  items: PropTypes.array,
};
