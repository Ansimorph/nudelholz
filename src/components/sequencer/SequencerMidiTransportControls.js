import React, { useEffect } from "react";
import { useMIDIControl } from "@react-midi/hooks";

const SequencerMidiTransportControls = React.memo(({ input, moveXOffset }) => {
  const noteEvent = useMIDIControl(input);

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
