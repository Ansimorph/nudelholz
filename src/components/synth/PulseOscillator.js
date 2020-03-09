import React, { useRef, useEffect, useState } from "react";
import { PulseOscillator, Gain } from "tone";
import styled from "astroturf";

import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: osc2;
`;

const PulseOscillatorElement = ({ frequency, register }) => {
  const oscillator = useRef();
  const gainNode = useRef();
  let gainControlSignal = useRef();
  let widthControlSignal = useRef();

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
    gainControlSignal.connect(gainNode.current.gain);
  }, [gainControlSignal]);

  useEffect(() => {
    widthControlSignal.connect(oscillator.current.width);
  }, [widthControlSignal]);

  const handleGainControlSignal = signalRef => {
    gainControlSignal = signalRef;
  };

  const handleWidthControlSignal = signalRef => {
    widthControlSignal = signalRef;
  };

  return (
    <StyledOscillator>
      <Group title="Pulse">
        <Encoder
          value={width}
          onChange={setWidth}
          label="Width"
          midiCC={8}
          modulate={true}
          registerSignal={handleWidthControlSignal}
        ></Encoder>
        <Encoder
          value={gain}
          onChange={setGain}
          label="Gain"
          midiCC={9}
          modulate={true}
          registerSignal={handleGainControlSignal}
        ></Encoder>
      </Group>
    </StyledOscillator>
  );
};
export default PulseOscillatorElement;
