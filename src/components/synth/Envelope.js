import React, { useRef, useEffect, useState } from "react";
import { Envelope, Gain, Signal, CrossFade } from "tone";
import styled from "astroturf";
import Encoder from "../ui/Encoder";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledEnvelope = styled("div")`
  grid-area: env;
`;

const EnvelopeElement = ({ trigger, register }) => {
  const envelope = useRef();
  const gain = useRef();
  const linearSignal = useRef();
  const crossFade = useRef();
  let gainControlSignal = useRef();

  const [attack, setAttack] = useState(0.25);
  const [decay, setDecay] = useState(0.25);

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

    envelope.current.connect(crossFade.current, 0, 1);
    linearSignal.current.connect(crossFade.current, 0, 0);

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
    envelope.current.set("attack", attack * 2 + 0.01);
  }, [attack]);

  useEffect(() => {
    envelope.current.set("decay", decay * 2 + 0.01);
  }, [decay]);

  useEffect(() => {
    gainControlSignal.connect(crossFade.current.fade);
  }, [gainControlSignal]);

  const handleGainControlSignal = signalRef => {
    gainControlSignal = signalRef;
  };

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
        <SignalEncoder
          label="Gain"
          midiCC={10}
          defaultValue={0.5}
          registerSignal={handleGainControlSignal}
        ></SignalEncoder>
      </Group>
    </StyledEnvelope>
  );
};
export default EnvelopeElement;
