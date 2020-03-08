import React, { useRef, useEffect, useState } from "react";
import { LFO, Gain } from "tone";
import styled from "astroturf";

import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: lfo;
`;

const LFOElement = ({ register }) => {
  let LfoNode = useRef();
  let gainNode = useRef();

  const [frequency, setFrequency] = useState(0.25);
  const [gain, setGain] = useState(1);

  useEffect(() => {
    LfoNode.current = new LFO();
    LfoNode.current.start();

    gainNode.current = new Gain({
      gain: 0
    });

    LfoNode.current.connect(gainNode.current);

    register(gainNode.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    LfoNode.current.set("frequency", frequency * 10 + 0.1);
  }, [frequency]);

  useEffect(() => {
    gainNode.current.gain.value = gain / 2;
  }, [gain]);

  return (
    <StyledOscillator>
      <Group title="LFO">
        <Encoder
          value="0"
          onChange={setFrequency}
          label="Shape"
          midiCC={8}
        ></Encoder>
        <Encoder
          value={frequency}
          onChange={setFrequency}
          label="Rate"
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
export default LFOElement;
