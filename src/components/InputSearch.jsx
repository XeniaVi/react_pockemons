import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export const InputSearch = ({ label, value, handleChange }) => {
  return (
    <TextField
      variant="standard"
      label={label}
      onChange={handleChange}
      value={value}
    />
  );
};

InputSearch.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
