import React, { useEffect, useRef } from "react";
import { OmniOscillator } from "tone";

const Synth = ({ frequency }) => {
  let omniOsc = useRef();

  useEffect(() => {
    omniOsc.current = new OmniOscillator("C#4", "fatsawtooth");
    omniOsc.current.toMaster();
    omniOsc.current.start();
  }, []);

  useEffect(() => {
    omniOsc.current.set("frequency", frequency);
  }, [frequency]);

  return <div></div>;
};
export default Synth;
