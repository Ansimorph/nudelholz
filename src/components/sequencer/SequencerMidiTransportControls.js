import React, { useEffect, useContext } from "react";
import { useMIDIControl } from "@react-midi/hooks";
import MidiContext from "../../midiContext";

const SequencerMidiTransportControls = React.memo(({ moveXOffset }) => {
  const { midiInput } = useContext(MidiContext);
  const noteEvent = useMIDIControl(midiInput);

  const handleInteraction = () => {
    if (noteEvent.control === 20) {
      if (noteEvent.value === 127) {
        moveXOffset(-1);
      } else {
        moveXOffset(1);
      }
    }
  };

  useEffect(() => {
    handleInteraction();
  });

  return null;
});

export default SequencerMidiTransportControls;
