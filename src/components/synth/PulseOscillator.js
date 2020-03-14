import React, { useRef, useEffect, useContext } from "react";
import { PulseOscillator, Gain } from "tone";
import styled from "astroturf";

import PlayStateContext from "../../playStateContext";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: osc2;
`;

const PulseOscillatorElement = ({ frequency, register }) => {
  const { playing } = useContext(PlayStateContext);
  const oscillator = useRef();
  const gainNode = useRef();
  let gainControlSignal = useRef();
  let widthControlSignal = useRef();

  useEffect(() => {
    oscillator.current = new PulseOscillator();
    gainNode.current = new Gain();

    oscillator.current.connect(gainNode.current);

    register(gainNode.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (playing) {
      oscillator.current.start();
    }
  }, [playing]);

  useEffect(() => {
    if (oscillator.current && frequency) {
      oscillator.current.frequency.setValueAtTime(
        frequency.frequency,
        frequency.time
      );
    }
  }, [frequency]);

  useEffect(() => {
    if (gainNode.current) {
      gainControlSignal.connect(gainNode.current.gain);
    }
  }, [gainControlSignal]);

  useEffect(() => {
    if (oscillator.current && widthControlSignal) {
      widthControlSignal.connect(oscillator.current.width);
    }
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
          midiCC={2}
          midiEndless={true}
          registerSignal={handleWidthControlSignal}
          defaultValue={0.25}
        ></SignalEncoder>
        <SignalEncoder
          label="Gain"
          midiCC={3}
          midiEndless={true}
          registerSignal={handleGainControlSignal}
          defaultValue={1}
        ></SignalEncoder>
      </Group>
    </StyledOscillator>
  );
};
export default PulseOscillatorElement;
