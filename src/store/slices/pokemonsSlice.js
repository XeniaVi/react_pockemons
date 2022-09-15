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
      return {
        ...state,
        items: action.payload,
        count: action.payload.length,
        offsetState: 0,
        currentPage: 1,
        itemsDisplay: action.payload.slice(0, state.limitState),
        countOfPages: Math.ceil(action.payload.length / state.limitState),
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
      const { data, limit, offset } = action.payload;
      return {
        ...state,
        items: data.results,
        itemsDisplay: data.results,
        itemsAll: data.results,
        count: data.count,
        previous: data.previous,
        next: data.next,
        limitState: limit,
        offsetState: offset,
        countOfPages: Math.ceil(data.count / limit),
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
