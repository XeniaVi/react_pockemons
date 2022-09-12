import React from "react";
import { mockData } from "../constants";
import { PokemonList } from "./PokemonList";

export const Main = () => {
  
  const items = mockData;

  return <PokemonList items={items} />;
};
