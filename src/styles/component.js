import styled from "styled-components";
import { Box, Card as MuiCard } from "@mui/material";

export const Container = styled(Box)`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: #cce1eb;
  box-sizing: border-box;
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
  flex: 1;
  padding: 1rem;
  min-width: 10rem;
  cursor: pointer;
`;

//#46748E, #08212C
