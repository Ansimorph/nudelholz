import React, { useRef, useEffect, useState, useContext } from "react";
import { FatOscillator, Gain } from "tone";
import styled from "astroturf";

import PlayStateContext from "../../playStateContext";
import Encoder from "../ui/Encoder";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: osc1;
`;

const SawtoothOscillator = ({ frequency, register }) => {
  const { playing } = useContext(PlayStateContext);
  const oscillator = useRef();
  const gainNode = useRef();
  let controlSignal = useRef();

  const [spread, setSpread] = useState(0);

  useEffect(() => {
    oscillator.current = new FatOscillator(0, "sawtooth");
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
    if (oscillator.current) {
      oscillator.current.set("spread", spread * 20);
    }
  }, [spread]);

  useEffect(() => {
    if (gainNode.current && controlSignal) {
      controlSignal.connect(gainNode.current.gain);
    }
  }, [controlSignal]);

  const handleControlSignal = signalRef => {
    controlSignal = signalRef;
  };

  return (
    <StyledOscillator>
      <Group title="Saw">
        <Encoder
          value={spread}
          onChange={setSpread}
          label="Spread"
          midiCC={0}
          midiEndless={true}
        ></Encoder>
        <SignalEncoder
          label="Gain"
          defaultValue={1}
          midiCC={1}
          midiEndless={true}
          registerSignal={handleControlSignal}
        ></SignalEncoder>
      </Group>
    </StyledOscillator>
  );
};
export default SawtoothOscillator;
