import React, { useEffect, useRef, useContext, useState } from "react";
import styled from "astroturf";
import {
  CircularInput,
  CircularTrack,
  CircularProgress
} from "react-circular-input";
import { uniqueId } from "lodash";
import MidiContext, { MIDI_CHANNEL } from "../../midiContext";
import ModulationContext from "../../modulationContext";
import { useMIDIControl } from "@react-midi/hooks";
import { Signal, Add } from "tone";

const StyledCircularInput = styled(CircularInput)``;

const CircularWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;

  &:focus-within {
    box-shadow: var(--focus-box-shadow);
  }
  border-radius: 50%;
`;

const StyledCircularProgress = styled(CircularProgress)`
  stroke: var(--yellow);
  stroke-width: var(--stroke-width);
  stroke-linecap: butt;
`;

const StyledCircularTrack = styled(CircularTrack)`
  stroke: var(--inactive);
  stroke-width: var(--stroke-width);
`;

const Label = styled("text")`
  fill: var(--yellow);
  font-size: 24px;
  font-weight: normal;
`;

const ControlElement = styled("article")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LfoButton = styled("button")`
  align-self: flex-end;
  margin-right: -28px;
  margin-top: -10px;
  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  background-color: var(--inactive);
  font-family: var(--font);
  font-size: 18px;
  color: var(--yellow);
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: var(--focus-box-shadow);
  }

  &.active-true {
    background-color: var(--yellow);
    color: var(--red);
  }

  > span:nth-of-type(1) {
    letter-spacing: -1px;
  }

  > span:nth-of-type(2) {
    vertical-align: 4px;
    letter-spacing: -1px;
  }
`;

const Encoder = ({
  value,
  onChange,
  label,
  midiCC,
  modulate,
  registerSignal
}) => {
  const id = useRef();
  const signalRef = useRef();
  const signalAdder = useRef();
  const { midiInput } = useContext(MidiContext);
  const { lfoRef } = useContext(ModulationContext);
  const midiControl = useMIDIControl(midiInput, {
    control: midiCC,
    channel: MIDI_CHANNEL
  });
  const [lfoActive, setLfoActive] = useState(false);

  // Listen to MIDI
  useEffect(() => {
    if (midiInput) {
      onChange(midiControl.value / 127);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midiControl.value, midiInput]);

  // Setup Signal Routing
  useEffect(() => {
    id.current = uniqueId("label_");
    if (registerSignal) {
      signalAdder.current = new Add();
      signalRef.current = new Signal(value);

      signalRef.current.connect(signalAdder.current, 0, 0);

      registerSignal(signalAdder.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup unique ID to connect label and input
  useEffect(() => {
    id.current = uniqueId("label_");
    if (lfoRef) {
    }
  }, [lfoRef]);

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
    <ControlElement>
      <CircularWrapper>
        <StyledCircularInput
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow={value}
          value={value}
          onChange={onChange}
          radius="40"
          aria-labelledby={id.current}
        >
          <StyledCircularTrack />
          <StyledCircularProgress />
          <Label
            id={id.current}
            x={40}
            y={40}
            textAnchor="middle"
            dy="0.3em"
            fontWeight="bold"
          >
            {label}
          </Label>
        </StyledCircularInput>
      </CircularWrapper>
      {modulate && (
        <LfoButton active={lfoActive.toString()} onClick={() => toggleLfo()}>
          <span>L</span>
          <span>F</span>
          <span>O</span>
        </LfoButton>
      )}
    </ControlElement>
  );
};
export default Encoder;
