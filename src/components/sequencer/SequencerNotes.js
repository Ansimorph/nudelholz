import React, { useState, useEffect, useCallback } from "react";
import note from "midi-note";

import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const SequencerNotes = ({ onChange }) => {
  const [baseNote, setBaseNote] = useState(0.5);
  const [noteOffset1, setNoteOffset1] = useState(0.13);
  const [noteOffset2, setNoteOffset2] = useState(0.24);
  const [noteOffset3, setNoteOffset3] = useState(0.3);

  const mapBaseNote = value => {
    return Math.floor(value * 36) + 18;
  };

  const mapOffset = value => {
    return Math.floor(value * 24);
  };

  const mapAbsoluteOffset = useCallback(
    value => {
      return mapBaseNote(baseNote) + mapOffset(value);
    },
    [baseNote]
  );

  useEffect(() => {
    onChange([
      note(mapAbsoluteOffset(noteOffset3)),
      note(mapAbsoluteOffset(noteOffset2)),
      note(mapAbsoluteOffset(noteOffset1)),
      note(mapBaseNote(baseNote))
    ]);
  }, [
    baseNote,
    mapAbsoluteOffset,
    noteOffset1,
    noteOffset2,
    noteOffset3,
    onChange
  ]);

  return (
    <Group>
      <Group title="Base">
        <Encoder
          label={note(mapBaseNote(baseNote))}
          valueText={true}
          value={baseNote}
          onChange={setBaseNote}
          midiCC={16}
        ></Encoder>
      </Group>
      <Group title="Notes">
        <Encoder
          label={`${note(mapAbsoluteOffset(noteOffset1))}+${mapOffset(
            noteOffset1
          )}`}
          valueText={true}
          value={noteOffset1}
          onChange={setNoteOffset1}
          midiCC={17}
        ></Encoder>
        <Encoder
          label={`${note(mapAbsoluteOffset(noteOffset2))}+${mapOffset(
            noteOffset2
          )}`}
          valueText={true}
          value={noteOffset2}
          onChange={setNoteOffset2}
          midiCC={18}
        ></Encoder>
        <Encoder
          label={`${note(mapAbsoluteOffset(noteOffset3))}+${mapOffset(
            noteOffset3
          )}`}
          valueText={true}
          value={noteOffset3}
          onChange={setNoteOffset3}
          midiCC={19}
        ></Encoder>
      </Group>
    </Group>
  );
};

export default SequencerNotes;
