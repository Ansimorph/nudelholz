import React, { useRef, useEffect, useState } from "react";
import { AmplitudeEnvelope } from "tone";
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
  font-size: 22px;
  font-weight: 500;
`;

const ControlElement = styled("article")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Oscillator = ({ trigger, register }) => {
  let ampEnv = useRef();

  const [attack, setAttack] = useState(1);

  useEffect(() => {
    ampEnv.current = new AmplitudeEnvelope({
      attack: 1,
      decay: 1,
      sustain: 1,
      release: 1
    }).toMaster();
    register(ampEnv.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (trigger) {
      ampEnv.current.triggerAttackRelease(trigger.duration, trigger.time);
    }
  }, [trigger]);

  useEffect(() => {
    ampEnv.current.set("attack", Number(attack));
  }, [attack]);

  return (
    <ControlElement>
      <CircularInput
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow={attack}
        value={attack}
        onChange={setAttack}
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
          Rise
        </Label>
      </CircularInput>
    </ControlElement>
  );
};
export default Oscillator;
