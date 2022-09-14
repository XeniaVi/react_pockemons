import { createSlice } from "@reduxjs/toolkit";
import {
  actionGetDetailedInfo,
  actionGetPokemons,
  actionGetAllPokemons,
} from "../asyncActions";

const pokemonsSlice = createSlice({
  name: "pokemonsSlice",
  initialState: {
    itemsAll: [],
    items: [],
    itemsDisplay: [],
    itemsFull: [],
    next: null,
    count: 0,
    limit: 10,
    offset: 0,
    countOfPages: 0,
    currentPage: 1,
  },
  reducers: {
    setLimit: (state, action) => {
      return {
        ...state,
        currentPage: 1,
        limit: Number(action.payload),
        offset: 0,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
        offset: state.limit * (action.payload - 1),
      };
    },
    setItems: (state, action) => {
      return {
        ...state,
        items: action.payload,
        count: action.payload.length,
        offset: 0,
        currentPage: 1,
        itemsDisplay: action.payload.slice(0, state.limit),
        countOfPages: Math.ceil(action.payload.length / state.limit),
      };
    },
    setItemsDisplay: (state, action) => {
      const { offset, limit } = action.payload;
      return {
        ...state,
        offset,
        limit,
        itemsDisplay: state.items.slice(offset, offset + limit),
        countOfPages: Math.ceil(state.items.length / limit),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionGetPokemons.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload.results,
        itemsDisplay: action.payload.results,
        itemsAll: action.payload.results,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
        countOfPages: Math.ceil(action.payload.count / state.limit),
      };
    });
    builder.addCase(actionGetAllPokemons.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.itemsAll, ...action.payload.results],
        itemsAll: [...state.itemsAll, ...action.payload.results],
        next: action.payload.next,
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

export const { setLimit, setCurrentPage, setItems, setItemsDisplay } =
  pokemonsSlice.actions;

export default pokemonsSlice.reducer;
