import React, { useEffect, useState } from "react";
import { colors } from "../constants";
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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../config";
import { actionGetDetailedInfo } from "../store/asyncActions";
import { getStatsColor } from "../helpers";

export const DetailedInfo = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pokemons.itemsFull);

  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const arr = items.filter((item) => Number(id) === item.id);
    !arr.length &&
      dispatch(actionGetDetailedInfo(`${config.APP_URL}pokemon/${id}`));
  }, []);

  useEffect(() => {
    !item && setItem(items.filter((item) => item.id === Number(id))[0]);
  }, [items]);

  return (
    <>
      {item ? (
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
                <StatsItemNumber
                  fs="2rem"
                  color={colors[item.types[0].type.name]}
                >
                  {item.height}
                </StatsItemNumber>
              </FlexContainer>

              <FlexContainer>
                <Typography variant="h4" component="h4">
                  Weight:{" "}
                </Typography>
                <StatsItemNumber
                  fs="2rem"
                  color={colors[item.types[0].type.name]}
                >
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
              <SmallImage
                src={item.sprites.other.home.front_default}
              ></SmallImage>
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
                  <StatsItemNumber color={getStatsColor(item.base_stat)}>
                    {item.base_stat}
                  </StatsItemNumber>
                </StatsItem>
              ))}
            </StatsList>
          </FlexInnerCard>
        </DetailedContainer>
      ) : (
        <span>Loading</span>
      )}{" "}
    </>
  );
};
