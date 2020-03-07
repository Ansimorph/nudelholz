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
  font-family: var(--font);
  font-size: 24px;
  font-weight: normal;
`;

const ControlElement = styled("article")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  border-radius: 50%;

  &:focus-within {
    box-shadow: var(--focus-box-shadow);
  }
`;

const Encoder = ({ value, onChange, label, midiCC }) => {
  const id = useRef();
  const { midiInput } = useContext(MidiContext);
  const midiControl = useMIDIControl(midiInput, {
    control: midiCC,
    channel: MIDI_CHANNEL
  });

  useEffect(() => {
    if (midiInput) {
      onChange(midiControl.value / 127);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midiControl.value, midiInput]);

  useEffect(() => {
    id.current = uniqueId("label_");
  }, []);

  return (
    <ControlElement>
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
    </ControlElement>
  );
};
export default Encoder;
