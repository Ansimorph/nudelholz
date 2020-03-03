import React, { useState, useEffect, useCallback } from "react";
import { useMIDIControl } from "@react-midi/hooks";
import SequencerGrid from "./SequencerGrid";
import SequencerMidiGrid from "./SequencerMidiGrid";
import SequencerMidiButtons from "./SequencerMidiButtons";
import SequencerMidiTransportControls from "./SequencerMidiTransportControls";

import update from "react-addons-update";
import { Sequence, Transport } from "tone";

const Sequencer = ({ midiInput, midiOutput, setFrequency }) => {
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
        setFrequency(NOTE_MAPPING[sequence[step]]);
        setCurrentStep(step);
      },
      fillArrayWithStepNumbers(STEP_COUNT),
      "4n"
    );

    seq.start(0);

    return function cleanup() {
      seq.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence]);

  // const setFrequency = step => {
  //   omniOsc.current.set("frequency", NOTE_MAPPING[sequence[step]]);
  // };

  const fillArrayWithStepNumbers = length => {
    return new Array(length).fill().map((value, index) => index);
  };

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

  const clamp = ({ number, min = 0, max }) => {
    return Math.min(Math.max(number, min), max);
  };

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
          <MIDIControlLog input={midiInput} />
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

const MIDIControlLog = ({ input }) => {
  const control = useMIDIControl(input, { control: 4, channel: 15 });
  return <div>Value: {control.value}</div>;
};

export default Sequencer;
