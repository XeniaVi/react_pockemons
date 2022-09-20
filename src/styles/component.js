import styled from "styled-components";
import {
  Avatar,
  Box,
  Card as MuiCard,
  createTheme,
  Typography as MuiTypography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#08212c",
      backgroundColor: "#cce1eb",
    },
    secondary: {
      main: "#46748e",
    },
    types: {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      electric: "#F7D02C",
      grass: "#7AC74C",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#A33EA1",
      ground: "#E2BF65",
      flying: "#A98FF3",
      psychic: "#F95587",
      bug: "#A6B91A",
      rock: "#B6A136",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD",
    },
  },
});

export const Container = muiStyled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "calc(100vh - 1rem)",
  paddingBottom: "1rem",
  backgroundColor: theme.palette.primary.backgroundColor,
  boxSizing: "border-box",
}));

export const FlexContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
`;

export const FilterContainer = styled(FlexContainer)`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

export const FlexInnerDetailedInfo = styled(FlexContainer)`
  width: auto;
  flex-wrap: nowrap;
  gap: 2rem;
  padding: 1rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DetailedContainer = muiStyled(Box)(({ theme }) => ({
  position: "relative",
  border: `1px solid ${theme.palette.secondary.main}`,
  padding: "2rem",
  marginTop: "1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",

  [theme.breakpoints.down("md")]: { padding: "1rem 0.5rem" },
}));

export const FlexInnerCard = styled(MuiCard)`
  width: 40%;
  min-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
    min-width: 240px;
  }
`;

export const Typography = muiStyled(MuiTypography)(({ theme }) => ({
  color: theme.palette.primary.main,

  [theme.breakpoints.down("md")]: { fontSize: "3rem !important" },
  [theme.breakpoints.down("sm")]: { fontSize: "2.5rem !important" },
}));

export const DetailedTypography = styled(MuiTypography)`
  font-size: 2rem !important;

  @media (max-width: 768px) {
    font-size: 1.5rem !important;
  }

  @media (max-width: 375px) {
    font-size: 1.25rem !important;
  }
`;

export const MainDetailedTypography = muiStyled(MuiTypography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "2rem !important",
  textAlign: "center",

  [theme.breakpoints.down("md")]: {
    paddingTop: "2rem",
    fontSize: "1.5rem !important",
  },
  [theme.breakpoints.down("sm")]: { fontSize: "2.5rem !important" },
}));

export const CustomLink = styled(Link)`
  text-decoration: none;
  transition: all 0.5s ease-in-out;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
  }

  @media (max-width: 768px) {
    min-width: 270px;
  }
`;

export const CircleProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

export const List = styled.ul`
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(189px, auto);
  gap: 1rem;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled(MuiCard)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  height: calc(100% - 2rem);
  cursor: pointer;
  background-color: ${(props) => props.bgcolor} !important;
  overflow: visible !important;
`;

export const CardImage = styled.img`
  width: 30%;
`;

export const CardAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  max-width: 30%;

  @media (max-width: 768px) {
    width: 90px !important;
    height: 90px !important;
  }

  @media (max-width: 375px) {
    width: 60px !important;
    height: 60px !important;
  }
`;

export const ImageContainer = muiStyled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "10rem",
  padding: "1rem",
  borderRadius: "50%",
  border: `2px solid ${theme.palette.secondary.main}`,
  backgroundColor: `${(props) => props.bgcolor || "transparent"}`,
}));

export const SmallImage = styled.img`
  width: 100%;
`;

export const StatsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1rem;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const StatsItem = styled.li`
  display: flex;
  gap: 1rem;
`;

export const StatsItemText = muiStyled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  fontSize: "1.2rem",
  fontWeight: 500,
}));

export const StatsItemNumber = styled.div`
  font-size: ${(props) => props.fs || "1.2rem"};
  color: ${(props) => props.color};
  font-weight: 700;
`;

export const TypePokemon = muiStyled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "5rem",
  height: "5rem",
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  fontWeight: 700,
  backgroundColor: `${(props) => props.bgcolor}`,
}));
