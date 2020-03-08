import React, { useRef, useEffect, useState } from "react";
import { FatOscillator, Gain } from "tone";
import styled from "astroturf";

import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: osc1;
`;

const SawtoothOscillator = ({ frequency, register }) => {
  let oscillator = useRef();
  let gainNode = useRef();

  const [spread, setSpread] = useState(0);
  const [gain, setGain] = useState(1);

  useEffect(() => {
    oscillator.current = new FatOscillator("C#4", "sawtooth");
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
    oscillator.current.set("spread", spread * 20);
  }, [spread]);

  return (
    <StyledOscillator>
      <Group title="Saw">
        <Encoder
          value={spread}
          onChange={setSpread}
          label="Spread"
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
export default SawtoothOscillator;
