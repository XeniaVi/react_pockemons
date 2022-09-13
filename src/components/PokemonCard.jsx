/*eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { Card, CardImage, CustomLink } from "../styles/component";
import { colors } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDetailedInfo } from "../store/asyncActions";

export const PokemonCard = ({ item }) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.pokemons.itemsFull);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const arr = items.filter((i) => i.name === item.name);
    !arr.length && dispatch(actionGetDetailedInfo(item.url));
  }, []);

  useEffect(() => {
    !currentItem &&
      setCurrentItem(items.filter((i) => i.name === item.name)[0]);
  }, [items]);

  return (
    <>
      {currentItem ? (
        <CustomLink to={`/pokemon/${currentItem.id}`}>
          <Card bgcolor={colors[currentItem.types[0].type.name]}>
            <Typography 
              component="h5"
              variant="h5"
              sx={{ borderBottom: "3px solid #46748E" }}
            >
              {currentItem.name.toUpperCase()}
            </Typography>
            <CardImage
              src={currentItem.sprites.other.home.front_default}
              alt=""
            />
          </Card>
        </CustomLink>
      ) : (
        <span>Loadfing</span>
      )}
    </>
  );
};

PokemonCard.propTypes = {
  item: PropTypes.object,
};
