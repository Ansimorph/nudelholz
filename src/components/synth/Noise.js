import React, { useRef, useEffect, useState } from "react";
import { Noise, Gain } from "tone";
import styled from "astroturf";

import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: noise;
`;

const NoiseElement = ({ register }) => {
  let noise = useRef();
  let gainNode = useRef();

  const [gain, setGain] = useState(0);

  useEffect(() => {
    noise.current = new Noise("pink");
    noise.current.start();

    gainNode.current = new Gain({
      gain: 0
    });

    noise.current.connect(gainNode.current);

    register(gainNode.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    gainNode.current.gain.value = gain / 2;
  }, [gain]);

  return (
    <StyledOscillator>
      <Group title="Noise">
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
export default NoiseElement;
