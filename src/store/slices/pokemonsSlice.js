import { createSlice } from "@reduxjs/toolkit";
import { actionGetDetailedInfo, actionGetPokemons } from "../asyncActions";

const pokemonsSlice = createSlice({
  name: "pokemonsSlice",
  initialState: {
    items: [],
    itemsFull: [],
    count: 0,
    previous: null,
    next: null,
    limit: 10,
    offset: 0,
    countOfPages: null,
  },
  extraReducers: (builder) => {
    builder.addCase(actionGetPokemons.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload.results,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        countOfPages: Math.ceil(action.payload.count / state.limit),
      };
    });
    builder.addCase(actionGetDetailedInfo.fulfilled, (state, action) => {
      return {
        ...state,
        itemsFull: [...state.itemsFull, action.payload],
      };
    });
  },
});

export default pokemonsSlice.reducer;
