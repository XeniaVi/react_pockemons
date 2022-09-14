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
        MenuProps={{
          PaperProps: {
            sx: {
              width,
              p: 1,
              "& .MuiList-root": {
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                gap: "0.5rem",
              },
            },
          },
        }}
      >
        {list.map((item) => (
          <MenuItem
            key={item.name}
            value={item.name}
            sx={{
              width: "45%",
              background: colors[item.name],
              "&:hover": {
                background: colors[item.name],
                opacity: 0.75,
              },
            }}
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
};
