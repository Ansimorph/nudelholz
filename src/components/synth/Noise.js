import React, { useRef, useEffect } from "react";
import { Noise, Gain } from "tone";
import styled from "astroturf";

import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: noise;
`;

const NoiseElement = ({ register }) => {
  const noise = useRef();
  const gainNode = useRef();
  let controlSignal = useRef();

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
    controlSignal.connect(gainNode.current.gain);
  }, [controlSignal]);

  const handleControlSignal = signalRef => {
    controlSignal = signalRef;
  };

  return (
    <StyledOscillator>
      <Group title="Noise">
        <SignalEncoder
          label="Gain"
          defaultValue={0}
          registerSignal={handleControlSignal}
          midiCC={4}
        ></SignalEncoder>
      </Group>
    </StyledOscillator>
  );
};
export default NoiseElement;
