import React from "react";
import PropTypes from "prop-types";
import { List } from "../styles/component";
import { PokemonCard } from "./PokemonCard";

export const PokemonList = React.memo(({ items }) => (
  <List>
    {items.map((item) => (
      <PokemonCard key={item.name} item={item} />
    ))}
  </List>
));

PokemonList.displayName = "PokemonList";

PokemonList.propTypes = {
  items: PropTypes.array.isRequired,
};
