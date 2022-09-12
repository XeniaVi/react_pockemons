import React from "react";
import PropTypes from "prop-types";
import { Card, List } from "../styles/component";

export const PokemonList = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <Card key={item.name}>{item.name}</Card>
      ))}
    </List>
  );
};

PokemonList.propTypes = {
  items: PropTypes.array,
};
