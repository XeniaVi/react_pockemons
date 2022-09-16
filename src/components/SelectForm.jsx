import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { colors } from "../constants";

export const SelectForm = ({
  label,
  list,
  handleChange,
  width,
  value,
  disabled,
  multiple,
  MenuProps,
  MenuItemProps,
  styles,
}) => {
  return (
    <FormControl sx={styles ? styles(width) : {}}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        disabled={disabled}
        multiple={multiple}
        MenuProps={MenuProps}
      >
        {list.map((item) => (
          <MenuItem
            key={item.name}
            value={item.name}
            sx={MenuItemProps ? MenuItemProps(colors[item.name]) : {}}
          >
            {item.name}
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
  MenuProps: PropTypes.object,
  MenuItemProps: PropTypes.func,
  styles: PropTypes.object,
};
