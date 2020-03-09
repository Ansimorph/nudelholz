import React, { useEffect, useRef, useContext, useState } from "react";
import ModulationContext from "../../modulationContext";
import { Signal, Add } from "tone";
import Encoder from "./Encoder";

const SignalEncoder = ({ defaultValue = 0, registerSignal, midiCC, label }) => {
  const signalRef = useRef();
  const signalAdder = useRef();
  const [value, setValue] = useState(defaultValue);
  const [lfoActive, setLfoActive] = useState(false);
  const { lfoRef } = useContext(ModulationContext);

  // Setup Signal Routing
  useEffect(() => {
    if (registerSignal) {
      signalAdder.current = new Add();
      signalRef.current = new Signal(defaultValue);

      signalRef.current.connect(signalAdder.current, 0, 0);

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

  return (
    <Encoder
      label={label}
      midiCC={midiCC}
      value={value}
      modulate="true"
      onChange={setValue}
      onLfoChange={toggleLfo}
      lfoActive={lfoActive}
    ></Encoder>
  );
};
export default SignalEncoder;
