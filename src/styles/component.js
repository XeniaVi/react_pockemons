import styled from "styled-components";
import { Box, Card as MuiCard } from "@mui/material";

export const Container = styled(Box)`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: #cce1eb;
  box-sizing: border-box;
`;

export const FlexContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "center"};
`;

export const FlexInnerCard = styled(FlexContainer)`
  padding: 0.5rem 0;
  border-bottom: 1px solid #46748e;
`;

export const List = styled.ul`
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  list-style: none;
`;

export const Card = styled(MuiCard)`
  position: relative;
  flex: 1 0 auto;
  padding: 1rem;
  min-width: 10rem;
  max-width: 28rem;
  cursor: pointer;
  overflow: visible !important;
`;

export const CardImage = styled.img`
  flex: 1 0 auto;
  max-width: 10rem;
`;

export const CardTypePokemon = styled(Box)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const StatsList = styled.ul`
  padding: 0.5rem;
  list-style: none;
`;

export const StatsItem = styled.li`
  padding: 0.5rem;
`;

export const StatsItemNumber = styled.span`
  color: ${(props) => props.color};
  font-weight: 700;
`;
