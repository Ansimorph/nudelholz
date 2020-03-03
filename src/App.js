import React, { useState } from "react";
import Sequencer from "./components/sequencer/Sequencer";
import { useMIDI } from "@react-midi/hooks";
import Synth from "./components/synth/Synth";

const App = () => {
  const [inputs, outputs] = useMIDI();
  const [frequency, setFrequency] = useState(0);

  return (
    <div>
      <Synth frequency={frequency} />
      <Sequencer
        midiInput={inputs[0]}
        midiOutput={outputs[0]}
        setFrequency={setFrequency}
      />
    </div>
  );
};
export default App;
