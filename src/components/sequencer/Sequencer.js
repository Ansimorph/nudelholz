import React, { useState, useEffect, useCallback, useContext } from "react";
import update from "react-addons-update";
import { Transport, Loop, Draw } from "tone";
import clamp from "../../util/clamp";
import styled from "astroturf";

import SequencerNotes from "./SequencerNotes";
import SequencerGrid from "./SequencerGrid";
import SequencerMidiGrid from "./SequencerMidiGrid";
import SequencerMidiButtons from "./SequencerMidiButtons";
import SequencerMidiTransportControls from "./SequencerMidiTransportControls";
import MidiContext from "../../midiContext";

const StyledSequencer = styled("div")`
  grid-area: seq;
`;

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
      if (sequence[j] === i) {
        if (j === currentStep) {
          grid[i][j] = "playing";
        } else {
          grid[i][j] = "on";
        }
      }
    }
  }

  return grid;
};

const Sequencer = ({ setFrequency, triggerEnvelope }) => {
  const STEP_COUNT = 8;
  const GRID_WIDTH = 4;
  // Y-Position is counted from top to bottom
  const [sequence, setSequence] = useState(Array(STEP_COUNT).fill(3));
  const [currentStep, setCurrentStep] = useState(0);
  const [triggerTime, setTriggerTime] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  const [noteMapping, setNoteMapping] = useState([]);

  const { midiInput } = useContext(MidiContext);

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
    triggerEnvelope({ duration: 0.6, time: triggerTime });
  }, [triggerEnvelope, triggerTime]);

  useEffect(() => {
    setFrequency({
      frequency: noteMapping[sequence[currentStep]],
      time: triggerTime
    });
  }, [currentStep, noteMapping, sequence, setFrequency, triggerTime]);

  useEffect(() => {
    const loop = new Loop(time => {
      Draw.schedule(() => {
        setCurrentStep(step => (step + 1) % STEP_COUNT);
      }, time);

      setTriggerTime(time);
    }, "4n");

    loop.start(0);

    return function cleanup() {
      loop.dispose();
    };
  }, []);

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
    <StyledSequencer>
      <SequencerNotes onChange={setNoteMapping}></SequencerNotes>
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
          />
          <SequencerMidiButtons
            clickHandler={handleGridClick}
            xOffset={xOffset}
          />
          <SequencerMidiTransportControls moveXOffset={moveXOffset} />
        </div>
      )}
    </StyledSequencer>
  );
};

export default Sequencer;
