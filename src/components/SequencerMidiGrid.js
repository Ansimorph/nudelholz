import { useEffect } from "react";
import { useMIDIOutput } from "@react-midi/hooks";

const MIDI_START = 24; // Buttons start at C1 in the bottom left corner
const COLOR_OFFSET = {
  red: 0,
  orange: 36,
  green: 72
};
const MIDI_CHANNEL = 15;
const MIDI_VELOCITY = 127;

const SequencerMidiGrid = ({ grid, output }) => {
  const { noteOn } = useMIDIOutput(output);

  const drawScreen = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        // Midi grid counts from bottom to top
        const count = (grid.length - i - 1) * grid[i].length + j;

        switch (grid[i][j]) {
          default:
          case "off":
            noteOn(MIDI_START + count, 0, MIDI_CHANNEL);
            break;
          case "red":
            noteOn(
              MIDI_START + count + COLOR_OFFSET.red,
              MIDI_VELOCITY,
              MIDI_CHANNEL
            );
            break;
          case "green":
            noteOn(
              MIDI_START + count + COLOR_OFFSET.green,
              MIDI_VELOCITY,
              MIDI_CHANNEL
            );
            break;
          case "orange":
            noteOn(
              MIDI_START + count + COLOR_OFFSET.orange,
              MIDI_VELOCITY,
              MIDI_CHANNEL
            );
            break;
        }
      }
    }
  };

  useEffect(() => {
    drawScreen();
  });

  return null;
};

export default SequencerMidiGrid;
