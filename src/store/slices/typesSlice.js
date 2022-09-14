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
    items: [],
  },
  reducers: {
    setSelectedTypes: (state, action) => {
      return {
        ...state,
        selectedTypes: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionGetPokemonsType.fulfilled, (state, action) => {
      return {
        ...state,
        types: action.payload.results,
      };
    });
    builder.addCase(
      actionGetPokemonsAccordingTypes.fulfilled,
      (state, action) => {
        return {
          ...state,
          items: [...state.items, ...action.payload.pokemon],
        };
      }
    );
  },
});

export const { setSelectedTypes } = typesSlice.actions;

export default typesSlice.reducer;
