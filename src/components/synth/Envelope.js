import React, { useRef, useEffect, useState } from "react";
import { Envelope, Gain, Signal, CrossFade, Time } from "tone";
import styled from "astroturf";
import Encoder from "../ui/Encoder";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const BEAT_LENGTH = "8n";

const StyledEnvelope = styled("div")`
  grid-area: env;
`;

const EnvelopeElement = ({ triggerTime, register }) => {
  const envelope = useRef();
  const gain = useRef();
  const linearSignal = useRef();
  const crossFade = useRef();
  let gainControlSignal = useRef();

  const [attack, setAttack] = useState(0.5);
  const [decay, setDecay] = useState(0.5);

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
    if (triggerTime) {
      envelope.current.triggerAttack(triggerTime);
    }
  }, [triggerTime]);

  const mapTime = time => {
    return Time(BEAT_LENGTH).toSeconds() * time;
  };

  useEffect(() => {
    if (envelope.current) {
      const beatTime = Time(BEAT_LENGTH);
      let decayTime = mapTime(decay);
      let attackTime = mapTime(attack);

      // ad is longer than beat shrink to fit
      if (attackTime + decayTime > beatTime) {
        const shrinkage = beatTime / (attackTime + decayTime);
        decayTime *= shrinkage;
        attackTime *= shrinkage;
      }

      envelope.current.set("attack", attackTime);
      envelope.current.set("decay", decayTime);
    }
  }, [attack, decay]);

  useEffect(() => {
    if (crossFade.current && gainControlSignal) {
      gainControlSignal.connect(crossFade.current.fade);
    }
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
          midiCC={12}
        ></Encoder>
        <Encoder
          value={decay}
          onChange={setDecay}
          label="Fall"
          midiCC={13}
        ></Encoder>
        <SignalEncoder
          label="Gain"
          midiCC={14}
          defaultValue={1}
          registerSignal={handleGainControlSignal}
        ></SignalEncoder>
      </Group>
    </StyledEnvelope>
  );
};
export default EnvelopeElement;
