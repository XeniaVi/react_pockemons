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
    limitState: 10,
    offsetState: 0,
    countOfPages: 0,
    currentPage: 1,
  },
  reducers: {
    setLimit: (state, action) => {
      return {
        ...state,
        currentPage: 1,
        limitState: Number(action.payload),
        offsetState: 0,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
        offsetState: state.limitState * (action.payload - 1),
      };
    },
    setItems: (state, action) => {
      const { data, offset } = action.payload;
      console.log(2);
      return {
        ...state,
        items: data,
        count: data.length,
        offsetState: offset,
        currentPage: offset / state.limitState + 1,
        itemsDisplay: data.slice(offset, state.limitState + offset),
        countOfPages: Math.ceil(data.length / state.limitState),
      };
    },
    setItemsDisplay: (state, action) => {
      const { offsetState, limitState } = action.payload;
      return {
        ...state,
        offsetState,
        limitState,
        itemsDisplay: state.items.slice(offsetState, offsetState + limitState),
        countOfPages: Math.ceil(state.items.length / limitState),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionGetPokemons.fulfilled, (state, action) => {
      const { data, limit } = action.payload;
      return {
        ...state,
        items: data.results,
        itemsDisplay: data.results,
        itemsAll: data.results,
        count: data.count,
        previous: data.previous,
        next: data.next,
        limitState: limit ? limit : state.limitState,
        offsetState: 0,
        countOfPages: limit
          ? Math.ceil(data.count / limit)
          : Math.ceil(data.count / state.limitState),
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
