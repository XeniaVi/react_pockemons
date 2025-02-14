import React from "react";
import { Outlet } from "react-router-dom";

import { Container as MUIContainer } from "@mui/material";

import { Container } from "../styles/component";
import { Header } from "./Header.jsx";

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
