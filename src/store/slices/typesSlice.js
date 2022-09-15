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
    setSelectedTypes: (state, action) => {
      return {
        ...state,
        selectedTypes: action.payload,
      };
    },
    setItemsTypes: (state, action) => {
      return {
        ...state,
        itemsTypes: action.payload,
      };
    },
    setItemsAllTypes: (state, action) => {
      return {
        ...state,
        itemsAllTypes: action.payload,
      };
    },
    reset: (state) => {
      return {
        ...state,
        itemsAllTypes: [],
        itemsTypes: [],
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
          itemsTypes: [...state.itemsTypes, { type, items: newItems }],
          itemsAllTypes: [...state.itemsAllTypes, ...newItems],
        };
      }
    );
  },
});

export const { setSelectedTypes, setItemsTypes, setItemsAllTypes, reset } =
  typesSlice.actions;

export default typesSlice.reducer;
