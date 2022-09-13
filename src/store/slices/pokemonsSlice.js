import { createSlice } from "@reduxjs/toolkit";
import { actionGetDetailedInfo, actionGetPokemons } from "../asyncActions";

const pokemonsSlice = createSlice({
  name: "pokemonsSlice",
  initialState: {
    items: [],
    itemsFull: [],
    count: 0,
    limit: 10,
    offset: 0,
    countOfPages: null,
    currentPage: 1,
  },
  reducers: {
    setLimit: (state, action) => {
      return {
        ...state,
        itemsFull: [],
        currentPage: 1,
        limit: action.payload,
        offset: 0,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        itemsFull: [],
        currentPage: action.payload,
        offset: state.limit * (action.payload - 1),
      };
    },
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

export const { setLimit, setCurrentPage } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
