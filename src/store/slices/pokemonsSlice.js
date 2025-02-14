import { createSlice } from "@reduxjs/toolkit";

import {
  actionGetAllPokemons,
  actionGetDetailedInfo,
  actionGetPokemons,
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
      state.currentPage = 1;
      state.limitState = Number(action.payload);
      state.offsetState = 0;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.offsetState = state.limitState * (action.payload - 1);
    },
    setItems: (state, action) => {
      const { data: items, offset: offsetState } = action.payload;

      state.items = items;
      state.offsetState = offsetState;
      state.currentPage = offsetState / state.limitState + 1;
      state.itemsDisplay = items.slice(
        offsetState,
        state.limitState + offsetState,
      );
      state.countOfPages = Math.ceil(items.length / state.limitState);
    },
    setItemsDisplay: (state, action) => {
      const { offsetState, limitState } = action.payload;
      state.offsetState = offsetState;
      state.limitState = limitState;
      state.currentPage = offsetState / limitState + 1;
      state.itemsDisplay = state.items.slice(
        offsetState,
        offsetState + limitState,
      );
      state.countOfPages = Math.ceil(state.items.length / limitState);
    },
  },
  extraReducers: builder => {
    builder.addCase(actionGetPokemons.fulfilled, (state, action) => {
      const { results: items, count, next, previous } = action.payload;

      state.items = items;
      state.itemsDisplay = items;
      state.itemsAll = items;
      state.count = count;
      state.previous = previous;
      state.next = next;
      state.countOfPages = Math.ceil(action.payload.count / state.limitState);
    });
    builder.addCase(actionGetAllPokemons.fulfilled, (state, action) => {
      const { results, next } = action.payload;

      const updatedItems = [...state.itemsAll, ...results];

      state.items = updatedItems;
      state.itemsAll = updatedItems;
      state.next = next;
    });
    builder.addCase(
      actionGetDetailedInfo.fulfilled,
      (state, action) =>
        (state.itemsFull = [...state.itemsFull, action.payload]),
    );
  },
});

export const { setLimit, setCurrentPage, setItems, setItemsDisplay } =
  pokemonsSlice.actions;

export default pokemonsSlice.reducer;
