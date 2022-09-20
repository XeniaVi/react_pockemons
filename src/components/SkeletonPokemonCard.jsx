import React from "react";
import { Skeleton, Typography } from "@mui/material";
import { stylesCard } from "../styles";
import { Card, CardAvatar } from "../styles/component";

export const SkeletonPokemonCard = () => (
  <Card sx={stylesCard}>
    <Typography component="h5" variant="h5" width="100%">
      <Skeleton />
    </Typography>

    <Skeleton variant="circular">
      <CardAvatar alt="Pokemon" />
    </Skeleton>
  </Card>
);
