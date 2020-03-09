import React, { useState, useEffect } from "react";
import { useMIDI } from "@react-midi/hooks";
import Tone from "tone";

import Layout from "./components/ui/Layout";
import Title from "./components/ui/Title";
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
        <Layout>
          <Title></Title>
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
        </Layout>
      </ModulationContext.Provider>
    </MidiContext.Provider>
  );
};
export default App;
