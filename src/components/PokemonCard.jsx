import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { Card, CardAvatar, CardImage, CustomLink } from "../styles/component";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDetailedInfo } from "../store/asyncActions";
import { SkeletonPokemonCard } from "./SkeletonPokemonCard";

export const PokemonCard = React.memo(({ item }) => {
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

  return currentItem ? (
    <CustomLink to={`/pokemon/${currentItem.id}`}>
      <Card
        sx={(theme) => ({
          background:
            currentItem.types.length === 1
              ? theme.palette.types[currentItem.types[0].type.name]
              : `linear-gradient(135deg, ${
                  theme.palette.types[currentItem.types[0].type.name]
                } 0%, ${
                  theme.palette.types[currentItem.types[1].type.name]
                } 100%)`,
        })}
      >
        <Typography
          component="h5"
          variant="h5"
          sx={(theme) => ({
            borderBottom: `3px solid  ${theme.palette.secondary.main}`,
          })}
        >
          {item.name.toUpperCase()}
        </Typography>

        {currentItem.sprites.other.home.front_default ? (
          <CardImage
            src={currentItem.sprites.other.home.front_default}
            alt={item.name}
          />
        ) : (
          <CardAvatar alt="Pokemon" />
        )}
      </Card>
    </CustomLink>
  ) : (
    <SkeletonPokemonCard />
  );
});

PokemonCard.displayName = "PokemonCard";

PokemonCard.propTypes = {
  item: PropTypes.object.isRequired,
};
