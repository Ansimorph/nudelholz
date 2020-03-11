import React, { useEffect, useRef, useContext } from "react";
import styled from "astroturf";
import {
  CircularInput,
  CircularTrack,
  CircularProgress
} from "react-circular-input";
import { uniqueId } from "lodash";
import MidiContext, { MIDI_CHANNEL } from "../../midiContext";
import { useMIDIControl } from "@react-midi/hooks";

const StyledCircularInput = styled(CircularInput)``;

const CircularWrapper = styled("div")`
  position: relative;
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
    letter-spacing: -0.5px;
  }
`;

const Encoder = ({
  value,
  onChange,
  lfoActive,
  onLfoChange,
  label,
  midiCC,
  modulate,
  children
}) => {
  const id = useRef();
  const { midiInput } = useContext(MidiContext);
  const midiControl = useMIDIControl(midiInput, {
    control: midiCC,
    channel: MIDI_CHANNEL
  });

  // Listen to MIDI
  useEffect(() => {
    if (midiInput) {
      onChange(midiControl.value / 127);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midiControl.value, midiInput]);

  // Setup unique ID to connect label and input
  useEffect(() => {
    id.current = uniqueId("label_");
  }, []);

  const avoidRollover = newValue => {
    const MAGNTIC_RANGE = 0.02;

    let correctedValue = newValue;

    // Make ends of the spectrum magnetci
    if (newValue < 0 + MAGNTIC_RANGE) {
      correctedValue = 0;
    }

    if (newValue > 1 - MAGNTIC_RANGE) {
      correctedValue = 1;
    }

    // Don't allow jumps from one end of the control to the other
    if (Math.abs(value - correctedValue) <= 1 - MAGNTIC_RANGE) {
      onChange(correctedValue);
    }
  };

  return (
    <ControlElement>
      <CircularWrapper>
        <StyledCircularInput
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow={value}
          value={value}
          onChange={avoidRollover}
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
        {children}
      </CircularWrapper>
      {modulate && (
        <LfoButton active={lfoActive.toString()} onClick={() => onLfoChange()}>
          <span>L</span>
          <span>F</span>
          <span>O</span>
        </LfoButton>
      )}
    </ControlElement>
  );
};
export default Encoder;
