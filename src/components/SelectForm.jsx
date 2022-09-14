import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SelectForm = ({ label, list, handleChange, width, limit }) => {
  return (
    <FormControl sx={{ width }}>
      <InputLabel>{label}</InputLabel>
      <Select value={limit} label={label} onChange={handleChange}>
        {list.map((item) => {
          return (
            <MenuItem key={item.text} value={item.text}>
              {item.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

SelectForm.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
};
