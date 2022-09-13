import React from "react";
import { Outlet } from "react-router-dom";
import { Container as MUIContainer } from "@mui/material";
import { Header } from "./Header";
import { Container } from "../styles/component";

export const Layout = () => {
  return (
    <Container>
      <MUIContainer maxWidth="xl">
        <Header />
        <Outlet />
      </MUIContainer>
    </Container>
  );
};
