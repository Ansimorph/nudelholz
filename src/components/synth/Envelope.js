import React, { useRef, useEffect, useState } from "react";
import { AmplitudeEnvelope } from "tone";
import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const Oscillator = ({ trigger, register }) => {
  let ampEnv = useRef();

  const [attack, setAttack] = useState(1);
  const [decay, setDecay] = useState(1);

  useEffect(() => {
    ampEnv.current = new AmplitudeEnvelope({
      attack: attack,
      decay: decay,
      sustain: 0,
      release: 0.01
    }).toMaster();

    ampEnv.current.attackCurve = "exponential";
    ampEnv.current.decayCurve = "exponential";

    register(ampEnv.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (trigger) {
      ampEnv.current.triggerAttackRelease(trigger.duration, trigger.time);
    }
  }, [trigger]);

  useEffect(() => {
    ampEnv.current.set("attack", attack * 2);
  }, [attack]);

  useEffect(() => {
    ampEnv.current.set("decay", decay * 2);
  }, [decay]);

  return (
    <div>
      <Group title="Envelope">
        <Encoder value={attack} onChange={setAttack} label="Rise"></Encoder>
        <Encoder value={decay} onChange={setDecay} label="Fall"></Encoder>
      </Group>
    </div>
  );
};
export default Oscillator;
