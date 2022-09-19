import React, { useEffect, useState } from "react";
import { Avatar, Button, CircularProgress } from "@mui/material";
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
  DetailedTypography,
  MainDetailedTypography,
} from "../styles/component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../config";
import { actionGetDetailedInfo } from "../store/asyncActions";
import { getStatsColor } from "../helpers";
import { sizeDefaultAvatar, stylesBtn } from "../styles";

export const DetailedInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          <Button
            onClick={() => navigate(-1, { replace: true })}
            variant="outlined"
            sx={stylesBtn}
          >
            Back
          </Button>
          <FlexContainer justifyContent="space-around">
            <FlexInnerDetailedInfo>
              <MainDetailedTypography component="h2">
                {item.name.toUpperCase()}
              </MainDetailedTypography>
              <FlexInnerDetailedInfo>
                {item.types.map((item) => (
                  <TypePokemon
                    key={item.type.name}
                    sx={(theme) => ({
                      background: theme.palette.types[item.type.name],
                    })}
                  >
                    {item.type.name}
                  </TypePokemon>
                ))}
              </FlexInnerDetailedInfo>
            </FlexInnerDetailedInfo>

            <FlexInnerDetailedInfo>
              <FlexContainer>
                <DetailedTypography
                  component="h4"
                  sx={{ color: "primary.main" }}
                >
                  Height:
                </DetailedTypography>
                <StatsItemNumber fs="2rem" sx={{ color: "secondary.main" }}>
                  {item.height}
                </StatsItemNumber>
              </FlexContainer>

              <FlexContainer>
                <DetailedTypography
                  component="h4"
                  sx={{ color: "primary.main" }}
                >
                  Weight:
                </DetailedTypography>
                <StatsItemNumber fs="2rem" sx={{ color: "secondary.main" }}>
                  {item.weight}
                </StatsItemNumber>
              </FlexContainer>

              <FlexContainer>
                <DetailedTypography
                  component="h4"
                  sx={{ color: "primary.main" }}
                >
                  Abilities:
                </DetailedTypography>

                <StatsList>
                  {item.abilities.map((item) => (
                    <StatsItem key={item.ability.name}>
                      <StatsItemText>{item.ability.name}</StatsItemText>
                    </StatsItem>
                  ))}
                </StatsList>
              </FlexContainer>
            </FlexInnerDetailedInfo>

            <ImageContainer
              sx={(theme) => ({
                background:
                  item.types.length === 1
                    ? theme.palette.types[item.types[0].type.name]
                    : `linear-gradient(-135deg, ${
                        theme.palette.types[item.types[0].type.name]
                      } 0%, ${
                        theme.palette.types[item.types[1].type.name]
                      } 100%)`,
              })}
            >
              {item.sprites.other.home.front_default ? (
                <SmallImage
                  src={item.sprites.other.home.front_default}
                  alt={item.name}
                />
              ) : (
                <Avatar alt="Pokemon" sx={sizeDefaultAvatar} />
              )}
            </ImageContainer>
          </FlexContainer>

          <FlexInnerCard>
            <DetailedTypography component="h4">Stats:</DetailedTypography>

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
        <CircularProgress />
      )}
    </>
  );
};
