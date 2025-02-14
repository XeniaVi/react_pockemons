import { createSlice } from "@reduxjs/toolkit";

import {
  actionGetPokemonsAccordingTypes,
  actionGetPokemonsType,
} from "../asyncActions";

const typesSlice = createSlice({
  name: "typesSlice",
  initialState: {
    types: [],
    selectedTypes: [],
    itemsTypes: [],
    itemsAllTypes: [],
  },
  reducers: {
    setSelectedTypes: (state, action) => (state.selectedTypes = action.payload),
    setItemsTypes: (state, action) => (state.itemsTypes = action.payload),
    setItemsAllTypes: (state, action) => (state.itemsAllTypes = action.payload),
    reset: state => {
      state.itemsAllTypes = [];
      state.itemsTypes = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(
      actionGetPokemonsType.fulfilled,
      (state, action) => (state.types = action.payload),
    );
    builder.addCase(
      actionGetPokemonsAccordingTypes.fulfilled,
      (state, action) => {
        const { data, type } = action.payload;
        const newItems = data.pokemon.map(item => item.pokemon);
        state.itemsAllTypes = [...state.itemsAllTypes, ...newItems];
        state.itemsTypes = [...state.itemsTypes, { type, items: newItems }];
      },
    );
  },
});

export const { setSelectedTypes, setItemsTypes, setItemsAllTypes, reset } =
  typesSlice.actions;

export default typesSlice.reducer;
