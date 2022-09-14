import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPokemons, getDetailedInfo, getPokemons } from "../../api";

export const actionGetPokemons = createAsyncThunk(
  "pokemonsSlice/actionGetPokemons",
  async (obj) => {
    try {
      const response = await getPokemons(obj);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const actionGetAllPokemons = createAsyncThunk(
  "pokemonsSlice/actionGetAllPokemons",
  async (url) => {
    try {
      const response = await getAllPokemons(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const actionGetDetailedInfo = createAsyncThunk(
  "pokemonsSlice/actionGetDetailedInfo",
  async (url) => {
    try {
      const response = await getDetailedInfo(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
