import React from "react";
import styled from "astroturf";
import {
  CircularInput,
  CircularTrack,
  CircularProgress
} from "react-circular-input";

const StyledCircularProgress = styled(CircularProgress)`
  stroke: var(--yellow);
  stroke-width: var(--stroke-width);
`;

const StyledCircularTrack = styled(CircularTrack)`
  stroke: var(--white);
  stroke-width: var(--stroke-width);
  opacity: 0.3;
`;

const Label = styled("text")`
  fill: var(--yellow);
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 20px;
  font-weight: 500;
`;

const ControlElement = styled("article")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

const Encoder = ({ value, onChange, label }) => {
  return (
    <ControlElement>
      <CircularInput
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow={value}
        value={value}
        onChange={onChange}
        radius="40"
        aria-labelledby="label"
      >
        <StyledCircularTrack />
        <StyledCircularProgress />
        <Label
          id="label"
          x={40}
          y={40}
          textAnchor="middle"
          dy="0.3em"
          fontWeight="bold"
        >
          {label}
        </Label>
      </CircularInput>
    </ControlElement>
  );
};
export default Encoder;
