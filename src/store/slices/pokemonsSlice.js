import { createSlice } from '@reduxjs/toolkit';
import {
  actionGetDetailedInfo,
  actionGetPokemons,
  actionGetAllPokemons,
} from '../asyncActions';

const pokemonsSlice = createSlice({
  name: 'pokemonsSlice',
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
      console.log('setItems');
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
    setSearchParams: (state, action) => {
      const { limit, offset } = action.payload;
      console.log(limit, offset);
      return {
        ...state,
        limitState: limit,
        offsetState: offset,
      };
    },
    setItemsDisplay: (state, action) => {
      console.log('setItemsDisplay');
      const { offsetState, limitState } = action.payload;
      console.log(offsetState, limitState);
      return {
        ...state,
        offsetState,
        limitState,
        currentPage: offsetState / limitState + 1,
        itemsDisplay: state.items.slice(offsetState, offsetState + limitState),
        countOfPages: Math.ceil(state.items.length / limitState),
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
        countOfPages: Math.ceil(action.payload.count / state.limitState),
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

export const {
  setLimit,
  setCurrentPage,
  setItems,
  setItemsDisplay,
  setSearchParams,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
