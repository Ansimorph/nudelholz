import React, { useEffect, useRef, useContext, useState } from "react";
import ModulationContext from "../../modulationContext";
import { Signal, Add, Meter } from "tone";
import useRaf from "@rooks/use-raf";
import Encoder from "./Encoder";
import styled from "astroturf";

const StyledLfoWrapper = styled("div")`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  will-change: transform;
  transform: rotate(calc(360deg * var(--lfo)));
  opacity: 0.8;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const StyledLfoDot = styled("div")`
  width: 8px;
  height: 8px;
  margin: 0;
  border-radius: 50%;
  background-color: var(--blue);
`;

const SignalEncoder = ({
  defaultValue = 0,
  registerSignal,
  midiCC,
  midiEndless,
  label
}) => {
  const signalRef = useRef();
  const signalAdder = useRef();
  const signalMeter = useRef();
  const animationElement = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [lfoActive, setLfoActive] = useState(false);
  const { lfoRef } = useContext(ModulationContext);

  // Setup Signal Routing
  useEffect(() => {
    if (registerSignal) {
      signalAdder.current = new Add();
      signalMeter.current = new Meter();
      signalRef.current = new Signal(defaultValue);

      signalRef.current.connect(signalAdder.current, 0, 0);
      signalAdder.current.connect(signalMeter.current);

      registerSignal(signalAdder.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Provide current value as a signal
  useEffect(() => {
    if (signalRef.current) {
      signalRef.current.value = value;
    }
  }, [value]);

  // Set up modulation of signal
  useEffect(() => {
    if (signalRef.current && lfoRef) {
      if (lfoActive) {
        lfoRef.connect(signalAdder.current, 0, 1);
      } else {
        lfoRef.disconnect(signalAdder.current);
      }
    }
  }, [lfoActive, lfoRef, signalRef, signalAdder]);

  const toggleLfo = () => {
    setLfoActive(state => !state);
  };

  // Animate LFO Value
  useRaf(() => {
    if (signalMeter.current) {
      animationElement.current.style.setProperty(
        "--lfo",
        Math.abs(signalMeter.current.getValue())
      );
    }
  }, lfoActive);

  return (
    <Encoder
      label={label}
      midiCC={midiCC}
      midiEndless={midiEndless}
      value={value}
      modulate="true"
      onChange={setValue}
      onLfoChange={toggleLfo}
      lfoActive={lfoActive}
    >
      {lfoActive && (
        <StyledLfoWrapper ref={animationElement}>
          <StyledLfoDot></StyledLfoDot>
        </StyledLfoWrapper>
      )}
    </Encoder>
  );
};
export default SignalEncoder;
