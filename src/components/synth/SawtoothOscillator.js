import React, { useRef, useEffect, useState } from "react";
import { FatOscillator, Gain } from "tone";
import styled from "astroturf";

import Encoder from "../ui/Encoder";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: osc1;
`;

const SawtoothOscillator = ({ frequency, register }) => {
  const oscillator = useRef();
  const gainNode = useRef();
  let controlSignal = useRef();

  const [spread, setSpread] = useState(0);

  useEffect(() => {
    oscillator.current = new FatOscillator("C#4", "sawtooth");
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
    oscillator.current.set("spread", spread * 20);
  }, [spread]);

  useEffect(() => {
    controlSignal.connect(gainNode.current.gain);
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
          midiCC={8}
        ></Encoder>
        <SignalEncoder
          label="Gain"
          defaultValue={1}
          midiCC={9}
          registerSignal={handleControlSignal}
        ></SignalEncoder>
      </Group>
    </StyledOscillator>
  );
};
export default SawtoothOscillator;