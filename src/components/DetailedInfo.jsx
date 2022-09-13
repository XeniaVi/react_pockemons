import React from "react";
import { colors, mockData } from "../constants";
import { Typography } from "@mui/material";
import {
  DetailedContainer,
  TypePokemon,
  FlexContainer,
  FlexInnerCard,
  FlexInnerDetailedInfo,
  SmallImage,
  StatsItem,
  StatsItemNumber,
  StatsItemText,
  StatsList,
  ImageContainer,
} from "../styles/component";

export const DetailedInfo = () => {
  const item = mockData[1];
  const color =
    item.base_stat > 170
      ? "#00733C"
      : item.base_stat > 85
      ? "#FFAA00"
      : "#A60000";

  return (
    <DetailedContainer>
      <FlexContainer justifyContent="space-around">
        <FlexInnerDetailedInfo>
          <Typography variant="h3" component="h2">
            {item.name.toUpperCase()}
          </Typography>
          <FlexInnerDetailedInfo>
            {item.types.map((item) => (
              <TypePokemon
                key={item.type.name}
                bgcolor={colors[item.type.name]}
              >
                {item.type.name}
              </TypePokemon>
            ))}
          </FlexInnerDetailedInfo>
        </FlexInnerDetailedInfo>

        <FlexInnerDetailedInfo>
          <FlexContainer>
            <Typography variant="h4" component="h4">
              Height:{" "}
            </Typography>
            <StatsItemNumber fs="2rem" color={colors[item.types[0].type.name]}>
              {item.height}
            </StatsItemNumber>
          </FlexContainer>

          <FlexContainer>
            <Typography variant="h4" component="h4">
              Weight:{" "}
            </Typography>
            <StatsItemNumber fs="2rem" color={colors[item.types[0].type.name]}>
              {item.weight}
            </StatsItemNumber>
          </FlexContainer>

          <FlexContainer>
            <Typography variant="h4" component="h4">
              Abilities:
            </Typography>

            <StatsList>
              {item.abilities.map((item) => (
                <StatsItem key={item.ability.name}>
                  <StatsItemText>{item.ability.name}</StatsItemText>
                </StatsItem>
              ))}
            </StatsList>
          </FlexContainer>
        </FlexInnerDetailedInfo>

        <ImageContainer bgcolor={colors[item.types[0].type.name]}>
          <SmallImage src={item.sprites.other.home.front_default}></SmallImage>
        </ImageContainer>
      </FlexContainer>

      <FlexInnerCard>
        <Typography variant="h4" component="h4">
          Stats:
        </Typography>

        <StatsList>
          {item.stats.map((item) => (
            <StatsItem key={item.stat.name}>
              <StatsItemText>{item.stat.name}: </StatsItemText>
              <StatsItemNumber color={color}>{item.base_stat}</StatsItemNumber>
            </StatsItem>
          ))}
        </StatsList>
      </FlexInnerCard>
    </DetailedContainer>
  );
};
