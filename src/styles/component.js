import styled from "styled-components";
import {
  Box,
  Card as MuiCard,
  Typography as MuiTypography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Container = styled(Box)`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: #cce1eb;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 375px) {
    padding: 0.5rem;
  }
`;

export const FlexContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
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

export const DetailedContainer = styled(Box)`
  position: relative;
  border: 1px solid #46748e;
  padding: 2rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

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

export const Typography = styled(MuiTypography)`
  @media (max-width: 768px) {
    font-size: 4rem !important;
  }

  @media (max-width: 375px) {
    font-size: 3.5rem !important;
  }
`;

export const CustomLink = styled(Link)`
  width: 49%;
  text-decoration: none;
  transition: all 0.5s ease-in-out;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
    transition: all 0.5s ease-in-out;
  }

  @media (max-width: 930px) {
    width: 48%;
  }

  @media (max-width: 768px) {
    width: 100%;
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Card = styled(MuiCard)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.bgcolor} !important;
  overflow: visible !important;
`;

export const CardImage = styled.img`
  width: 30%;
`;

export const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  padding: 1rem;
  border-radius: 50%;
  border: 2px solid #46748e;
  background-color: ${(props) => props.bgcolor || "transparent"};
`;

export const SmallImage = styled.img`
  width: 100%;
`;

export const StatsList = styled.ul`
  padding: 0.5rem;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const StatsItem = styled.li`
  padding: 0.5rem;
`;

export const StatsItemText = styled.span`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const StatsItemNumber = styled.span`
  font-size: ${(props) => props.fs || "1.2rem"};
  color: ${(props) => props.color || "#46748e"};
  font-weight: 700;
`;

export const TypePokemon = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  color: #08212c;
  text-transform: uppercase;
  font-weight: 700;
  background-color: ${(props) => props.bgcolor};
`;
