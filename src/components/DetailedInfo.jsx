import { AccordionDetails, Typography } from "@mui/material";
import React from "react";
import { colors, mockData } from "../constants";
import {
  CustomAccordion,
  CustomAccordionSummary,
  DetailedTypePokemon,
  FlexInnerCard,
  FlexInnerDetailedInfo,
  StatsItem,
  StatsItemNumber,
  StatsList,
} from "../styles/component";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const DetailedInfo = () => {
  const item = mockData[1];
  const color =
    item.base_stat > 170
      ? "#00733C"
      : item.base_stat > 85
      ? "#FFAA00"
      : "#A60000";

  return (
    <div
      style={{
        border: "1px solid #46748e",
        padding: "1rem",
        marginTop: "1.5rem",
      }}
    >
      <Typography variant="h3" component="h2">
        {item.name.toUpperCase()}
      </Typography>
      <FlexInnerDetailedInfo>
        {item.types.map((item) => (
          <DetailedTypePokemon
            key={item.type.name}
            bgcolor={colors[item.type.name]}
          >
            {item.type.name}
          </DetailedTypePokemon>
        ))}
      </FlexInnerDetailedInfo>
      <span>Height: {item.height}</span>
      <span>Weight: {item.weight}</span>
      <FlexInnerDetailedInfo>
        <CustomAccordion>
          <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h4" component="h4">
              Abilities
            </Typography>
          </CustomAccordionSummary>
          <AccordionDetails>
            <StatsList>
              {item.abilities.map((item) => (
                <Typography key={item.name}>{item.ability.name}</Typography>
              ))}
            </StatsList>
          </AccordionDetails>
        </CustomAccordion>
      </FlexInnerDetailedInfo>
      <FlexInnerCard>
        Stats:
        <StatsList>
          {item.stats.map((item) => (
            <StatsItem key={item.stat.name}>
              <span>{item.stat.name.toUpperCase()}: </span>
              <StatsItemNumber color={color}>{item.base_stat}</StatsItemNumber>
            </StatsItem>
          ))}
        </StatsList>
      </FlexInnerCard>
    </div>
  );
};
