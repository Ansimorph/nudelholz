import React, { useState, useEffect } from "react";
import { useMIDI, useMIDIControl } from "@react-midi/hooks";
import SequencerGrid from "./components/SequencerGrid";
import SequencerMidiGrid from "./components/SequencerMidiGrid";
import SequencerMidiButtons from "./components/SequencerMidiButtons";
import update from "react-addons-update";
import { Sequence, Transport } from "tone";

const App = () => {
  const [inputs, outputs] = useMIDI();
  // Y-Position is counted from top to bottom
  const [sequence, setSequence] = useState([1, 1, 2, 3]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(
    () => {
      Transport.bpm.value = 60;
      Transport.seconds = 0;
      Transport.stop();

      const seq = new Sequence(
        (time, step) => {
          setCurrentStep(step);
        },
        [0, 1, 2, 3],
        "4n"
      );

      seq.start();

      Transport.start();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleGridClick = ({ x, y }) => {
    if (sequence[x] !== y) {
      setSequence(update(sequence, { [x]: { $set: y } }));
    }
  };

  return (
    <div>
      <SequencerGrid
        grid={sequence2Grid(sequence, currentStep)}
        clickHandler={handleGridClick}
      />
      {inputs.length >= 1 && (
        <div>
          <SequencerMidiGrid
            grid={sequence2Grid(sequence, currentStep)}
            output={outputs[0]}
          />
          <SequencerMidiButtons
            clickHandler={handleGridClick}
            input={inputs[0]}
          />
          <MIDIControlLog input={inputs[0]} />
        </div>
      )}
    </div>
  );
};

const sequence2Grid = (sequence, currentStep) => {
  const GRID_HEIGHT = 4;
  const grid = [];

  for (let i = 0; i < GRID_HEIGHT; i++) {
    grid.push([]);
    for (let j = 0; j < sequence.length; j++) {
      if (j === currentStep) {
        grid[i].push("playing");
      } else {
        if (sequence[j] === i) {
          grid[i].push("on");
        } else {
          grid[i].push("off");
        }
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
