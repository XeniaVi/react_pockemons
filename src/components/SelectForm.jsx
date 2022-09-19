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
  MenuProps,
  MenuItemProps,
  styles,
}) => {
  console.log(MenuItemProps);
  return (
    <FormControl sx={(theme) => (styles ? styles(width, theme) : {})}>
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
            sx={(theme) =>
              MenuItemProps ? MenuItemProps(theme.palette.types[item.name]) : {}
            }
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
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};
