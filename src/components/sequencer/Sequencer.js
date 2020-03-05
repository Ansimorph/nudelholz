import React, { useState, useEffect, useCallback } from "react";
import update from "react-addons-update";
import { Sequence, Transport } from "tone";
import clamp from "../../util/clamp";
import fillArrayWithAscendingNumbers from "../../util/fillArrayWithAscendingNumbers";

import SequencerGrid from "./SequencerGrid";
import SequencerMidiGrid from "./SequencerMidiGrid";
import SequencerMidiButtons from "./SequencerMidiButtons";
import SequencerMidiTransportControls from "./SequencerMidiTransportControls";

const Sequencer = ({
  midiInput,
  midiOutput,
  setFrequency,
  triggerEnvelope
}) => {
  const STEP_COUNT = 8;
  const GRID_WIDTH = 4;
  const NOTE_MAPPING = ["F4", "G#4", "Bb4", "C4"];
  // Y-Position is counted from top to bottom
  const [sequence, setSequence] = useState(Array(STEP_COUNT).fill(0));
  const [currentStep, setCurrentStep] = useState(0);
  const [xOffset, setXOffset] = useState(0);

  useEffect(
    () => {
      Transport.bpm.value = 60;
      Transport.seconds = 0;
      Transport.start();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const seq = new Sequence(
      (time, step) => {
        setFrequency({frequency: NOTE_MAPPING[sequence[step]], time: time});
        triggerEnvelope({ duration: 0.6, time: time });
        setCurrentStep(step);
      },
      fillArrayWithAscendingNumbers(STEP_COUNT),
      "4n"
    );

    seq.start(0);

    return function cleanup() {
      seq.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence, setFrequency, triggerEnvelope]);

  const handleGridClick = ({ x, y }) => {
    if (sequence[x] !== y) {
      setSequence(update(sequence, { [x]: { $set: y } }));
    }
  };

  const moveXOffset = useCallback(amount => {
    setXOffset(offset =>
      clamp({
        number: offset + amount,
        max: STEP_COUNT - GRID_WIDTH
      })
    );
  }, []);

  return (
    <div>
      <SequencerGrid
        grid={sequence2Grid(sequence, currentStep)}
        clickHandler={handleGridClick}
      />
      {midiInput && (
        <div>
          <SequencerMidiGrid
            grid={cropGrid({
              grid: sequence2Grid(sequence, currentStep),
              xOffset: xOffset,
              xWidth: GRID_WIDTH
            })}
            output={midiOutput}
          />
          <SequencerMidiButtons
            clickHandler={handleGridClick}
            xOffset={xOffset}
            input={midiInput}
          />
          <SequencerMidiTransportControls
            moveXOffset={moveXOffset}
            input={midiInput}
          />
        </div>
      )}
    </div>
  );
};

const cropGrid = ({ grid, xOffset, xWidth }) => {
  const croppedArray = [];
  for (let i = 0; i < grid.length; i++) {
    croppedArray.push(grid[i].slice(xOffset, xWidth + xOffset));
  }
  return croppedArray;
};

const sequence2Grid = (sequence, currentStep) => {
  const GRID_HEIGHT = 4;
  const grid = [];

  for (let i = 0; i < GRID_HEIGHT; i++) {
    grid.push([]);
    for (let j = 0; j < sequence.length; j++) {
      grid[i].push("off");
      if (j === currentStep) {
        grid[i][j] = "playing";
      }
      if (sequence[j] === i) {
        grid[i][j] = "on";
      }
    }
  }

  return grid;
};

export default Sequencer;
