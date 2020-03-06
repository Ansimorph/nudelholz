import React, { useState, useEffect } from "react";
import { useMIDI } from "@react-midi/hooks";
import styled, { css } from "astroturf";
import Tone from "tone";

import MidiContext from "./midiContext";
import Oscillator from "./components/synth/Oscillator";
import Envelope from "./components/synth/Envelope";
import Sequencer from "./components/sequencer/Sequencer";

css`
  :root {
    --yellow: #f3ff6b;
    --blue: #6bd5ff;
    --red: #ff4444;
    --white: #eee;
    --inactive: #ff6d72;

    --focus-box-shadow: 0 0 0 4px #6bd5ff;
    --font: "pirata", sans-serif;
    --stroke-width: 8;
  }

  html {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #e4d4f9;
  }
`;

const MainElement = styled("main")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 20px;
  max-width: 600px;
  background-color: var(--red);
  border-radius: 10px;
`;

const Title = styled("h1")`
  text-align: center;
  font-family: var(--font);
  font-size: 100px;
  color: var(--yellow);
  line-height: 0.8;
  font-weight: normal;
  margin: 0 0 40px 0;
`;

const App = () => {
  const [inputs, outputs] = useMIDI();

  const [frequency, setFrequency] = useState({ frequency: 0, time: 0 });

  const [oscillatorRef, setOscillatorRef] = useState();
  const [envelopeRef, setEnvelopeRef] = useState();

  const [trigger, setTrigger] = useState([]);

  const midi = { midiInput: inputs[0], midiOutput: outputs[0] };

  // Setup Wiring between audio nodes
  useEffect(() => {
    if (oscillatorRef && envelopeRef) {
      Tone.connect(oscillatorRef, envelopeRef);
    }
  }, [oscillatorRef, envelopeRef]);

  return (
    <MidiContext.Provider value={midi}>
      <MainElement>
        <Title>nudelholz</Title>
        <Oscillator register={setOscillatorRef} frequency={frequency} />
        <Envelope register={setEnvelopeRef} trigger={trigger}></Envelope>
        <Sequencer setFrequency={setFrequency} triggerEnvelope={setTrigger} />
      </MainElement>
    </MidiContext.Provider>
  );
};
export default App;
