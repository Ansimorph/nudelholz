import React, { useRef, useEffect, useState } from "react";
import { Envelope, Gain, Signal, CrossFade } from "tone";
import styled from "astroturf";
import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledEnvelope = styled("div")`
  grid-area: env;
`;

const EnvelopeElement = ({ trigger, register }) => {
  let envelope = useRef();
  let gain = useRef();
  let linearSignal = useRef();
  let crossFade = useRef();

  const [attack, setAttack] = useState(0.25);
  const [decay, setDecay] = useState(0.25);
  const [envelopeGain, setEnvelopeGain] = useState(0.5);

  useEffect(() => {
    envelope.current = new Envelope({
      attack: attack,
      decay: decay,
      sustain: 0,
      release: 0.01,
      attackCurve: "exponential",
      decayCurve: "exponential"
    });

    gain.current = new Gain({
      gain: 0
    });

    linearSignal.current = new Signal(1);

    crossFade.current = new CrossFade(0);

    envelope.current.connect(crossFade.current, 0, 0);
    linearSignal.current.connect(crossFade.current, 0, 1);

    crossFade.current.connect(gain.current.gain);

    register(gain.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (trigger) {
      envelope.current.triggerAttackRelease(trigger.duration, trigger.time);
    }
  }, [trigger]);

  useEffect(() => {
    envelope.current.set("attack", attack * 2);
  }, [attack]);

  useEffect(() => {
    envelope.current.set("decay", decay * 2);
  }, [decay]);

  useEffect(() => {
    crossFade.current.fade.value = 1 - envelopeGain;
  }, [envelopeGain]);

  return (
    <StyledEnvelope>
      <Group title="Envelope">
        <Encoder
          value={attack}
          onChange={setAttack}
          label="Rise"
          midiCC={8}
        ></Encoder>
        <Encoder
          value={decay}
          onChange={setDecay}
          label="Fall"
          midiCC={9}
        ></Encoder>
        <Encoder
          value={envelopeGain}
          onChange={setEnvelopeGain}
          label="Gain"
          midiCC={10}
        ></Encoder>
      </Group>
    </StyledEnvelope>
  );
};
export default EnvelopeElement;
