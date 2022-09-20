import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { List } from "../styles/component";
import { PokemonCard } from "./PokemonCard";
import { createList } from "../helpers";
import { SkeletonPokemonCard } from "./SkeletonPokemonCard";

export const PokemonList = React.memo(({ items, isLoading, limit }) => {
  const [skeletonList, setSkeletonList] = useState([]);
  useEffect(() => {
    setSkeletonList(createList(limit));
  }, []);

  return (
    <List>
      {isLoading
        ? skeletonList.map((item) => <SkeletonPokemonCard key={item.id} />)
        : items.map((item) => <PokemonCard key={item.name} item={item} />)}
    </List>
  );
});

PokemonList.displayName = "PokemonList";

PokemonList.propTypes = {
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
};
