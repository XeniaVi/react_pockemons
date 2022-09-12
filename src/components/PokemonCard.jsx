import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import {
  Card,
  CardImage,
  CardTypePokemon,
  FlexContainer,
  FlexInnerCard,
  StatsItem,
  StatsItemNumber,
  StatsList,
} from "../styles/component";
import { colors } from "../constants";

export const PokemonCard = ({ item }) => {
  const color =
    item.base_stat > 170
      ? "#00733C"
      : item.base_stat > 85
      ? "#FFAA00"
      : "#A60000";

  return (
    <Card>
      <Typography
        component="h3"
        variant="h5"
        sx={{ borderBottom: "3px solid #46748E" }}
      >
        {item.name.toUpperCase()}
      </Typography>
      <FlexContainer justifyContent="space-between">
        <Box>
          <div>
            <FlexInnerCard>
              Types:
              {item.types.map((item) => (
                <CardTypePokemon
                  key={item.type.name}
                  color={colors[item.type.name]}
                />
              ))}
            </FlexInnerCard>
          </div>
          <FlexInnerCard>
            Stats:
            <StatsList>
              {item.stats.map((item) => (
                <StatsItem key={item.stat.name}>
                  <span>{item.stat.name.toUpperCase()}: </span>
                  <StatsItemNumber color={color}>
                    {item.base_stat}
                  </StatsItemNumber>
                </StatsItem>
              ))}
            </StatsList>
          </FlexInnerCard>
        </Box>
        <CardImage
          src={item.sprites.other.home.front_default}
          position={{ top: "-3rem", right: "-2.5rem" }}
          alt=""
        />
      </FlexContainer>
    </Card>
  );
};

PokemonCard.propTypes = {
  item: PropTypes.object,
};
