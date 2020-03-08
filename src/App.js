import React, { useState, useEffect } from "react";
import { useMIDI } from "@react-midi/hooks";
import styled from "astroturf";
import Tone from "tone";

import MidiContext from "./midiContext";
import Oscillator from "./components/synth/Oscillator";
import Envelope from "./components/synth/Envelope";
import Filter from "./components/synth/Filter";
import Effects from "./components/synth/Effects";
import Sequencer from "./components/sequencer/Sequencer";

const MainElement = styled("main")`
  display: grid;
  grid-gap: var(--grid-gap);
  padding: 15px;
  background-color: var(--red);
  border-radius: 10px;

  grid-template-columns: repeat(4, 90px);
  grid-template-rows: repeat(8, max-content);
  grid-template-areas:
    "logo    logo    logo  logo"
    "osc1    osc1    noise lfo"
    "osc1    osc1    noise lfo"
    "env     env     env   lfo"
    "filter  filter  fx    fx"
    "seq     seq     seq   seq"
    "seq     seq     seq   seq"
    "seq     seq     seq   seq";

  @media (min-width: 920px) {
    padding: 30px;
    grid-template-columns: repeat(4, 90px) 40px repeat(4, 90px);
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
      "logo    logo    logo  logo  space  filter  filter  fx    fx"
      "osc1    osc1    noise lfo   space  seq     seq     seq   seq"
      "osc1    osc1    noise lfo   space  seq     seq     seq   seq"
      "env     env     env   lfo   space  seq     seq     seq   seq";
  }
`;

const Title = styled("h1")`
  grid-area: logo;
  text-align: left;
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
  const [filterRef, setFilterRef] = useState();
  const [effectsInputRef, setEffectsInputRef] = useState();
  const [effectsOutputRef, setEffectsOutputRef] = useState();

  const [trigger, setTrigger] = useState([]);

  const midi = { midiInput: inputs[0], midiOutput: outputs[0] };

  // Setup Wiring between audio nodes
  useEffect(() => {
    if (oscillatorRef && envelopeRef) {
      Tone.connect(oscillatorRef, envelopeRef);
      Tone.connect(envelopeRef, filterRef);
      Tone.connect(filterRef, effectsInputRef);
      Tone.connect(effectsOutputRef, Tone.Master);
    }
  }, [
    oscillatorRef,
    envelopeRef,
    filterRef,
    effectsInputRef,
    effectsOutputRef
  ]);

  return (
    <MidiContext.Provider value={midi}>
      <MainElement>
        <Title>nudelholz</Title>
        <Oscillator register={setOscillatorRef} frequency={frequency} />
        <Envelope register={setEnvelopeRef} trigger={trigger}></Envelope>
        <Filter register={setFilterRef}></Filter>
        <Effects
          registerInput={setEffectsInputRef}
          registerOutput={setEffectsOutputRef}
        ></Effects>
        <Sequencer setFrequency={setFrequency} triggerEnvelope={setTrigger} />
      </MainElement>
    </MidiContext.Provider>
  );
};
export default App;
