import { createSlice } from "@reduxjs/toolkit";

const pokemonsSlice = createSlice({
  name: "pokemonsSlice",
  initialState: {
    items: [],
  },
});

export default pokemonsSlice.reducer;
