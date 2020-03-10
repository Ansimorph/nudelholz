import React, { useRef, useEffect } from "react";
import { LFO, Gain, Scale, Delay } from "tone";
import styled from "astroturf";

import Encoder from "../ui/Encoder";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledOscillator = styled("div")`
  grid-area: lfo;
`;

const LFOElement = ({ register }) => {
  const LfoNode = useRef();
  const gainNode = useRef();
  let frequencyControlSignal = useRef();
  let gainControlSignal = useRef();

  useEffect(() => {
    LfoNode.current = new LFO("4n", -0.5, 0.5);
    LfoNode.current.start();

    gainNode.current = new Gain({
      gain: 0
    });

    LfoNode.current.connect(gainNode.current);

    register(gainNode.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const delay = new Delay(0.01);
    gainControlSignal.connect(delay);
    delay.connect(gainNode.current.gain);

    return function cleanup() {
      delay.dispose();
    };
  }, [gainControlSignal]);

  useEffect(() => {
    const scale = new Scale(0, 10);
    const delay = new Delay(0.01);

    frequencyControlSignal.connect(scale);
    scale.connect(delay);
    delay.connect(LfoNode.current.frequency);

    return function cleanup() {
      scale.dispose();
      delay.dispose();
    };
  }, [frequencyControlSignal]);

  const handleFrequencyControlSignal = signalRef => {
    frequencyControlSignal = signalRef;
  };

  const handleGainControlSignal = signalRef => {
    gainControlSignal = signalRef;
  };

  return (
    <StyledOscillator>
      <Group title="LFO">
        <Encoder value="" onChange="" label="Shape" midiCC={8}></Encoder>
        <SignalEncoder
          label="Rate"
          midiCC={8}
          defaultValue={0.1}
          registerSignal={handleFrequencyControlSignal}
        ></SignalEncoder>
        <SignalEncoder
          label="Gain"
          midiCC={9}
          defaultValue={0.1}
          registerSignal={handleGainControlSignal}
        ></SignalEncoder>
      </Group>
    </StyledOscillator>
  );
};
export default LFOElement;
