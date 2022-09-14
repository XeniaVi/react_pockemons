import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SelectForm = ({
  label,
  list,
  handleChange,
  width,
  value,
  disabled,
  multiple,
}) => {
  return (
    <FormControl sx={{ width }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        disabled={disabled}
        multiple={multiple}
      >
        {list.map((item) => (
          <MenuItem key={item.text} value={item.text}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectForm.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
  ]),
  disabled: PropTypes.bool.isRequired,
};
