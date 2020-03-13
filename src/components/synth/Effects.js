import React, { useRef, useEffect } from "react";
import { WaveShaper, CrossFade, Gain, Freeverb } from "tone";
import styled from "astroturf";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledFilter = styled("div")`
  grid-area: fx;
`;

const EffectsElement = ({ registerInput, registerOutput }) => {
  const input = useRef();
  const shaper = useRef();
  const crossFadeFold = useRef();
  const reverbNode = useRef();
  let foldControlSignal = useRef();
  let reverbControlSignal = useRef();

  // Setup WaveFolder
  useEffect(() => {
    input.current = new Gain();

    shaper.current = new WaveShaper(x => {
      const alpha = 1;
      return Math.sin(Math.pow(2, 3.2 * alpha) * Math.sin(x * (Math.PI / 2)));
    });

    crossFadeFold.current = new CrossFade(0);

    // Connect input -> shaper
    input.current.fan(shaper.current);

    // Connect input, shaper -> crossfader
    input.current.connect(crossFadeFold.current, 0, 0);
    shaper.current.connect(crossFadeFold.current, 0, 1);

    // Setup Reverb
    reverbNode.current = new Freeverb();

    // Connect input -> reverb
    crossFadeFold.current.connect(reverbNode.current);

    registerInput(input.current);
    registerOutput(reverbNode.current);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (reverbControlSignal) {
      reverbControlSignal.connect(reverbNode.current.wet);
    }
  }, [reverbControlSignal]);

  useEffect(() => {
    if (foldControlSignal) {
      foldControlSignal.connect(crossFadeFold.current.fade);
    }
  }, [foldControlSignal]);

  const handleReverbControlSignal = signalRef => {
    reverbControlSignal = signalRef;
  };

  const handleFoldControlSignal = signalRef => {
    foldControlSignal = signalRef;
  };

  return (
    <StyledFilter>
      <Group title="Effects">
        <SignalEncoder
          label="Fold"
          midiCC={10}
          defaultValue={0}
          registerSignal={handleFoldControlSignal}
        ></SignalEncoder>
        <SignalEncoder
          label="Room"
          midiCC={11}
          defaultValue={0.2}
          registerSignal={handleReverbControlSignal}
        ></SignalEncoder>
      </Group>
    </StyledFilter>
  );
};
export default EffectsElement;
