import React, { useState, useEffect } from "react";
import { useMIDI } from "@react-midi/hooks";
import styled from "astroturf";
import Tone from "tone";

import MidiContext from "./midiContext";
import ModulationContext from "./modulationContext";
import SawtoothOscillator from "./components/synth/SawtoothOscillator";
import PulseOscillator from "./components/synth/PulseOscillator";
import Noise from "./components/synth/Noise";
import LFO from "./components/synth/Lfo";
import Envelope from "./components/synth/Envelope";
import Filter from "./components/synth/Filter";
import Effects from "./components/synth/Effects";
import Sequencer from "./components/sequencer/Sequencer";

const MainElement = styled("main")`
  display: grid;
  grid-gap: var(--grid-gap);
  padding: 15px 30px 15px 15px;
  background-color: var(--red);
  border-radius: 10px;

  grid-template-columns: repeat(4, max-content);
  grid-template-rows: repeat(8, max-content);
  grid-template-areas:
    "logo    logo    logo  logo"
    "osc1    osc2    noise lfo"
    "osc1    osc2    noise lfo"
    "env     env     env   lfo"
    "filter  filter  fx    fx"
    "seq     seq     seq   seq"
    "seq     seq     seq   seq"
    "seq     seq     seq   seq";

  @media (min-width: 920px) {
    padding: 30px;
    grid-template-columns: repeat(8, max-content);
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
      "logo    logo    logo  logo  bla     bla     bla   bla"
      "osc1    osc1    osc2  osc2  noise   lfo     lfo   lfo"
      "filter  filter  fx    fx    seq     seq     seq   seq"
      "env     env     env   null  seq     seq     seq   seq";
  }
`;

const Title = styled("h1")`
  grid-area: logo;
  text-align: left;
  font-size: 100px;
  color: var(--yellow);
  line-height: 0.8;
  font-weight: normal;
  margin: 0 0 20px 0;
`;

const App = () => {
  const [inputs, outputs] = useMIDI();

  const [frequency, setFrequency] = useState({ frequency: 0, time: 0 });

  const [oscillator1Ref, setOscillator1Ref] = useState();
  const [oscillator2Ref, setOscillator2Ref] = useState();
  const [noiseRef, setNoiseRef] = useState();
  const [lfoRef, setLfoRef] = useState();
  const [envelopeRef, setEnvelopeRef] = useState();
  const [filterRef, setFilterRef] = useState();
  const [effectsInputRef, setEffectsInputRef] = useState();
  const [effectsOutputRef, setEffectsOutputRef] = useState();

  const [trigger, setTrigger] = useState([]);

  const midi = { midiInput: inputs[0], midiOutput: outputs[0] };
  const modulation = { lfoRef: lfoRef };

  // Setup Wiring between audio nodes
  useEffect(() => {
    if (oscillator1Ref && envelopeRef) {
      Tone.connect(oscillator1Ref, envelopeRef);
      Tone.connect(oscillator2Ref, envelopeRef);
      Tone.connect(noiseRef, envelopeRef);
      Tone.connect(envelopeRef, filterRef);
      Tone.connect(filterRef, effectsInputRef);
      Tone.connect(effectsOutputRef, Tone.Master);
    }
  }, [
    envelopeRef,
    filterRef,
    effectsInputRef,
    effectsOutputRef,
    oscillator1Ref,
    oscillator2Ref,
    noiseRef
  ]);

  return (
    <MidiContext.Provider value={midi}>
      <ModulationContext.Provider value={modulation}>
        <MainElement>
          <Title>nudelholz</Title>
          <SawtoothOscillator
            register={setOscillator1Ref}
            frequency={frequency}
          />
          <PulseOscillator
            register={setOscillator2Ref}
            frequency={frequency}
          ></PulseOscillator>
          <Noise register={setNoiseRef}></Noise>
          <LFO register={setLfoRef}></LFO>
          <Filter register={setFilterRef}></Filter>
          <Effects
            registerInput={setEffectsInputRef}
            registerOutput={setEffectsOutputRef}
          ></Effects>
          <Envelope register={setEnvelopeRef} trigger={trigger}></Envelope>
          <Sequencer setFrequency={setFrequency} triggerEnvelope={setTrigger} />
        </MainElement>
      </ModulationContext.Provider>
    </MidiContext.Provider>
  );
};
export default App;
