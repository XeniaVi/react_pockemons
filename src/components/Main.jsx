import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetPokemons } from "../store/asyncActions";
import { PokemonList } from "./PokemonList";

export const Main = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.pokemons.items);
  const limit = useSelector((state) => state.pokemons.limit);
  const offset = useSelector((state) => state.pokemons.offset);

  useEffect(() => {
    dispatch(actionGetPokemons({ endpoint: "pokemon", limit, offset }));
  }, [limit]);

  return items.length ? <PokemonList items={items} /> : <CircularProgress />;
};
