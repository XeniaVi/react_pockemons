import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { Card, CardImage } from "../styles/component";
import { colors } from "../constants";

export const PokemonCard = ({ item }) => {
  return (
    <Card bgcolor={colors[item.types[0].type.name]}>
      <Typography
        component="h3"
        variant="h5"
        sx={{ borderBottom: "3px solid #46748E" }}
      >
        {item.name.toUpperCase()}
      </Typography>
      <CardImage src={item.sprites.other.home.front_default} alt="" />
    </Card>
  );
};

PokemonCard.propTypes = {
  item: PropTypes.object,
};
