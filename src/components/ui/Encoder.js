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
import clamp from "../../util/clamp";

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
  font-size: var(--font-size-input);
  font-weight: normal;
`;

const ControlElement = styled("article")`
  display: flex;
  min-height: 118px;
  width: var(--encoder-size);
  flex-direction: column;
  align-items: flex-start;
`;

const LfoButton = styled("button")`
  align-self: flex-start;
  padding: 0;
  margin-top: -10px;
  margin-left: calc(var(--button-size) * 2 - 2px);
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
  valueText,
  midiCC,
  midiEndless = false,
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
    if (midiInput && midiControl.control === midiCC) {
      if (midiEndless) {
        const step = 0.05;
        const delta = midiControl.value === 127 ? -step : step;
        onChange(clamp({ number: value + delta, min: 0, max: 1 }));
      } else {
        onChange(midiControl.value / 127);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midiControl, midiInput]);

  // Setup unique ID to connect label and input
  useEffect(() => {
    id.current = uniqueId("label_");
  }, []);

  const avoidRollover = newValue => {
    const MAGNTIC_RANGE = 0.02;

    let correctedValue = newValue;

    // Make ends of the spectrum magnetic
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
          aria-valuenow={Math.round(value * 100) / 100}
          aria-valuetext={valueText ? label : null}
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
