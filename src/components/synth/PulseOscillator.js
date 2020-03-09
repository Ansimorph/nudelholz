import React, { useRef, useEffect } from "react";
import { PulseOscillator, Gain } from "tone";
import styled from "astroturf";

import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: osc2;
`;

const PulseOscillatorElement = ({ frequency, register }) => {
  const oscillator = useRef();
  const gainNode = useRef();
  let gainControlSignal = useRef();
  let widthControlSignal = useRef();

  useEffect(() => {
    oscillator.current = new PulseOscillator();
    oscillator.current.start();

    gainNode.current = new Gain();

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
        <SignalEncoder
          label="Width"
          midiCC={8}
          registerSignal={handleWidthControlSignal}
          defaultValue={0.25}
        ></SignalEncoder>
        <SignalEncoder
          label="Gain"
          midiCC={9}
          registerSignal={handleGainControlSignal}
          defaultValue={1}
        ></SignalEncoder>
      </Group>
    </StyledOscillator>
  );
};
export default PulseOscillatorElement;
