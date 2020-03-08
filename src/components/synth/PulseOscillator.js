import React, { useRef, useEffect, useState } from "react";
import { PulseOscillator, Gain } from "tone";
import styled from "astroturf";

import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: osc2;
`;

const PulseOscillatorElement = ({ frequency, register }) => {
  let oscillator = useRef();
  let gainNode = useRef();

  const [width, setWidth] = useState(0.25);
  const [gain, setGain] = useState(1);

  useEffect(() => {
    oscillator.current = new PulseOscillator();
    oscillator.current.start();

    gainNode.current = new Gain({
      gain: 0
    });

    oscillator.current.connect(gainNode.current);

    register(gainNode.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    oscillator.current.set("frequency", frequency.frequency, frequency.time);
  }, [frequency]);

  useEffect(() => {
    gainNode.current.gain.value = gain / 2;
  }, [gain]);

  useEffect(() => {
    oscillator.current.set("width", width);
  }, [width]);

  return (
    <StyledOscillator>
      <Group title="Pulse">
        <Encoder
          value={width}
          onChange={setWidth}
          label="Width"
          midiCC={8}
        ></Encoder>
        <Encoder
          value={gain}
          onChange={setGain}
          label="Gain"
          midiCC={9}
        ></Encoder>
      </Group>
    </StyledOscillator>
  );
};
export default PulseOscillatorElement;
