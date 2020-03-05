import React, { useRef, useEffect } from "react";
import { OmniOscillator } from "tone";

const Oscillator = ({ frequency, register }) => {
  let omniOsc = useRef();

  useEffect(() => {
    omniOsc.current = new OmniOscillator("C#4", "fatsawtooth");
    omniOsc.current.start();
    register(omniOsc.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    omniOsc.current.set("frequency", frequency);
  }, [frequency]);

  return <div></div>;
};
export default Oscillator;
