import React, { useState, useEffect } from "react";
import note from "midi-note";

import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const SequencerNotes = ({ onChange }) => {
  const [baseNote, setBaseNote] = useState(0.5);
  const [noteOffset1, setNoteOffset1] = useState(0.1);
  const [noteOffset2, setNoteOffset2] = useState(0.2);
  const [noteOffset3, setNoteOffset3] = useState(0.3);

  const mapBaseNote = value => {
    return Math.floor(value * 36) + 18;
  };

  const mapOffset = value => {
    return Math.floor(value * 24);
  };

  useEffect(() => {
    const mapAbsoluteOffset = value => {
      return mapBaseNote(baseNote) + mapOffset(value);
    };

    onChange([
      note(mapAbsoluteOffset(noteOffset3)),
      note(mapAbsoluteOffset(noteOffset2)),
      note(mapAbsoluteOffset(noteOffset1)),
      note(mapBaseNote(baseNote))
    ]);
  }, [baseNote, noteOffset1, noteOffset2, noteOffset3, onChange]);

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
          label={"+" + mapOffset(noteOffset1)}
          valueText={true}
          value={noteOffset1}
          onChange={setNoteOffset1}
          midiCC={17}
        ></Encoder>
        <Encoder
          label={"+" + mapOffset(noteOffset2)}
          valueText={true}
          value={noteOffset2}
          onChange={setNoteOffset2}
          midiCC={18}
        ></Encoder>
        <Encoder
          label={"+" + mapOffset(noteOffset3)}
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
