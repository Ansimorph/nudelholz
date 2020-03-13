import React, { useRef, useEffect, useContext } from "react";
import { Noise, Gain } from "tone";
import styled from "astroturf";

import PlayStateContext from "../../playStateContext";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: noise;
`;

const NoiseElement = ({ register }) => {
  const { playing } = useContext(PlayStateContext);
  const noise = useRef();
  const gainNode = useRef();
  let controlSignal = useRef();

  useEffect(() => {
    noise.current = new Noise("pink");
    gainNode.current = new Gain({
      gain: 0
    });

    noise.current.connect(gainNode.current);

    register(gainNode.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (playing) {
      noise.current.start();
    }
  }, [playing]);

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
