import React, { useState } from "react";
import { useMIDI, useMIDIControl } from "@react-midi/hooks";
import SequencerGrid from "./components/SequencerGrid";
import SequencerMidiGrid from "./components/SequencerMidiGrid";
import SequencerMidiButtons from "./components/SequencerMidiButtons";
import update from "react-addons-update";

const App = () => {
  const [inputs, outputs] = useMIDI();
  // Y-Position is counted from top to bottom
  const [sequence, setSequence] = useState([1, 1, 2, 3]);

  const handleGridClick = ({ x, y }) => {
    if (sequence[x] !== y) {
      setSequence(update(sequence, { [x]: { $set: y } }));
    }
  };

  if (inputs.length < 1) return <div>No MIDI Inputs</div>;

  return (
    <div>
      <SequencerGrid
        grid={sequence2Grid(sequence)}
        clickHandler={handleGridClick}
      />
      <SequencerMidiGrid grid={sequence2Grid(sequence)} output={outputs[0]} />
      <SequencerMidiButtons clickHandler={handleGridClick} input={inputs[0]} />
      <MIDIControlLog input={inputs[0]} />
    </div>
  );
};

const sequence2Grid = sequence => {
  const GRID_HEIGHT = 4;
  const grid = [];

  for (let i = 0; i < GRID_HEIGHT; i++) {
    grid.push([]);
    for (let j = 0; j < sequence.length; j++) {
      if (sequence[j] === i) {
        grid[i].push("red");
      } else {
        grid[i].push("off");
      }
    }
  }

  return grid;
};

const MIDIControlLog = ({ input }) => {
  const control = useMIDIControl(input, { control: 4, channel: 15 });
  return <div>Value: {control.value}</div>;
};

export default App;
