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
    setItemsTypes: (state, action) => {
      return {
        ...state,
        items: action.payload,
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
        const { data, type } = action.payload;
        const newItems = data.pokemon.map((item) => item.pokemon);

        return {
          ...state,
          items: [...state.items, { type, items: newItems }],
        };
      }
    );
  },
});

export const { setSelectedTypes, setItemsTypes } = typesSlice.actions;

export default typesSlice.reducer;
