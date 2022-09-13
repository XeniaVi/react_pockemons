import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLimit } from "../store/slices/pokemonsSlice";

export const SelectForm = () => {
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.pokemons.limit);

  const handleChange = (event) => {
    dispatch(setLimit(event.target.value));
  };

  return (
    <FormControl sx={{ width: "230px" }}>
      <InputLabel>Items to show per page</InputLabel>
      <Select
        value={limit}
        label="Items to show per page"
        onChange={handleChange}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </FormControl>
  );
};
