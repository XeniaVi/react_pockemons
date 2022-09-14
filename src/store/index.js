import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "./slices/pokemonsSlice";
import typesSlice from "./slices/typesSlice";

const store = configureStore({
  reducer: { pokemons: pokemonsSlice, types: typesSlice },
});

export default store;
