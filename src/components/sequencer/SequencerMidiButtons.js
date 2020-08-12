import React, { useEffect, useContext } from "react";
import { useMIDINote } from "@react-midi/hooks";
import MidiContext from "../../midiContext";

const MIDI_START = 24; // Buttons start at C1 in the bottom left corner
const MIDI_NUMBER_OF_BUTTONS = 16;
const BUTTON_ROW_WIDTH = 4;

const SequencerMidiButtons = React.memo(({ clickHandler, xOffset }) => {
  const { midiInput } = useContext(MidiContext);
  const noteEvent = useMIDINote(midiInput);

  const handleButtonPress = () => {
    if (
      noteEvent &&
      noteEvent.note >= MIDI_START &&
      noteEvent.note <= MIDI_START + MIDI_NUMBER_OF_BUTTONS &&
      noteEvent.on === true &&
      noteEvent.velocity === 127
    ) {
      const x = (noteEvent.note - MIDI_START) % 4;
      const y =
        BUTTON_ROW_WIDTH - 1 - Math.floor((noteEvent.note - MIDI_START) / 4);
      clickHandler({ x: x + xOffset, y: y });
    }
  };

  useEffect(() => {
    handleButtonPress();
  });

  return null;
});

export default SequencerMidiButtons;
