import React, { useRef, useEffect } from "react";
import { AmplitudeEnvelope } from "tone";

const Oscillator = ({ trigger, register }) => {
  let ampEnv = useRef();

  useEffect(() => {
    ampEnv.current = new AmplitudeEnvelope({
      attack: 1,
      decay: 1,
      sustain: 1,
      release: 1
    }).toMaster();
    register(ampEnv.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (trigger) {
      ampEnv.current.triggerAttackRelease(trigger.duration, trigger.time);
    }
  }, [trigger]);

  return <div></div>;
};
export default Oscillator;
