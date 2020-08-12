import React, { useState, useEffect } from "react";
import { useMIDI } from "@react-midi/hooks";
import Tone from "tone";

import Layout from "./components/ui/Layout";
import Title from "./components/ui/Title";
import Links from "./components/ui/Links";
import MidiContext from "./midiContext";
import ModulationContext from "./modulationContext";
import PlayStateContext from "./playStateContext";
import SawtoothOscillator from "./components/synth/SawtoothOscillator";
import PulseOscillator from "./components/synth/PulseOscillator";
import Noise from "./components/synth/Noise";
import LFO from "./components/synth/Lfo";
import Envelope from "./components/synth/Envelope";
import Filter from "./components/synth/Filter";
import Effects from "./components/synth/Effects";
import Sequencer from "./components/sequencer/Sequencer";
import PlayButton from "./components/transport/Play";
import BpmControl from "./components/transport/Bpm";

const App = () => {
  const {inputs, outputs} = useMIDI();

  const [frequency, setFrequency] = useState();

  const [oscillator1Ref, setOscillator1Ref] = useState();
  const [oscillator2Ref, setOscillator2Ref] = useState();
  const [noiseRef, setNoiseRef] = useState();
  const [lfoRef, setLfoRef] = useState();
  const [envelopeRef, setEnvelopeRef] = useState();
  const [filterRef, setFilterRef] = useState();
  const [effectsInputRef, setEffectsInputRef] = useState();
  const [effectsOutputRef, setEffectsOutputRef] = useState();

  const [playing, setPlaying] = useState(false);
  const [trigger, setTrigger] = useState();

  let midi = { midiInput: inputs[0], midiOutput: outputs[0] };

  const modulation = { lfoRef: lfoRef };
  const playState = { playing: playing, onChange: setPlaying };

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
        <PlayStateContext.Provider value={playState}>
          <Layout>
            <Title></Title>
            <PlayButton></PlayButton>
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
            <Envelope
              register={setEnvelopeRef}
              triggerTime={trigger}
            ></Envelope>
            <BpmControl></BpmControl>
            <Sequencer
              setFrequency={setFrequency}
              triggerEnvelope={setTrigger}
            />
          </Layout>
          <Links></Links>
        </PlayStateContext.Provider>
      </ModulationContext.Provider>
    </MidiContext.Provider>
  );
};
export default App;
