import React, { useState } from "react";
import Sequencer from "./components/sequencer/Sequencer";
import { useMIDI } from "@react-midi/hooks";
import Synth from "./components/synth/Synth";
import styled, { css } from "astroturf";

css`
  @font-face {
    font-family: "clickbait";
    src: url("/clickbait.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --yellow: #f1fa8c;
    --blue: #8bf9de;
    --red: #ff5555;
    --white: #eee;
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
  font-family: Clickbait, sans-serif;
  font-size: 150px;
  color: var(--yellow);
  line-height: 0.8;
  font-weight: normal;
  margin: 0;
`;

const App = () => {
  const [inputs, outputs] = useMIDI();
  const [frequency, setFrequency] = useState(0);

  return (
    <MainElement>
      <Title>nudelholz</Title>
      <Synth frequency={frequency} />
      <Sequencer
        midiInput={inputs[0]}
        midiOutput={outputs[0]}
        setFrequency={setFrequency}
      />
    </MainElement>
  );
};
export default App;
