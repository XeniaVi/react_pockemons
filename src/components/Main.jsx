import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetPokemons } from "../store/asyncActions";
import { PokemonList } from "./PokemonList";

export const Main = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pokemons.items);

  useEffect(() => {
    dispatch(actionGetPokemons({ endpoint: "pokemon", limit: 20, offset: 0 }));
  }, []);

  return (
    <>{items.length ? <PokemonList items={items} /> : <CircularProgress />}</>
  );
};
