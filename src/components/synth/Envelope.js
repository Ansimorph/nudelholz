import React, { useRef, useEffect, useState } from "react";
import { AmplitudeEnvelope } from "tone";
import styled from "astroturf";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb
} from "react-circular-input";

const StyledCircularProgress = styled(CircularProgress)`
  stroke: var(--yellow);
`;

const StyledCircularThumb = styled(CircularThumb)`
  fill: var(--white);
`;

const StyledCircularTrack = styled(CircularTrack)`
  stroke: var(--white);
  opacity: 0.3;
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
    ampEnv.current.set("attack", attack);
  }, [attack]);

  return (
    <CircularInput value={attack} onChange={setAttack}>
      <StyledCircularTrack />
      <StyledCircularProgress />
      <StyledCircularThumb />
    </CircularInput>
  );
};
export default Oscillator;
