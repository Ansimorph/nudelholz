import React, { useRef, useEffect, useState } from "react";
import { WaveShaper, CrossFade, Gain, Freeverb } from "tone";
import styled from "astroturf";
import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledFilter = styled("div")`
  grid-area: fx;
`;

const EffectsElement = ({ registerInput, registerOutput }) => {
  let input = useRef();
  let shaper = useRef();
  let crossFadeFold = useRef();
  let crossFadeReverb = useRef();
  let reverbNode = useRef();

  const [fold, setFold] = useState(0.5);
  const [reverb, setReverb] = useState(0.5);

  // Setup WaveFolder
  useEffect(() => {
    input.current = new Gain();

    shaper.current = new WaveShaper(x => {
      const alpha = 0.5;
      return Math.sin(Math.sin(x + Math.PI / 2) * 8 * (alpha + 0.125));
    }, 2048);

    crossFadeFold.current = new CrossFade(0);

    // Connect input -> shaper
    input.current.fan(shaper.current);

    // Connect input, shaper -> crossfader
    input.current.connect(crossFadeFold.current, 0, 0);
    shaper.current.connect(crossFadeFold.current, 0, 1);

    registerInput(input.current);
    // eslint-disable-next-line
  }, []);

  //Setup Reverb
  useEffect(() => {
    reverbNode.current = new Freeverb();
    crossFadeReverb.current = new CrossFade(0);

    // Connect input -> reverb
    crossFadeFold.current.fan(reverbNode.current);

    // Connect input, reverb -> crossfader
    crossFadeFold.current.connect(crossFadeReverb.current, 0, 0);
    reverbNode.current.connect(crossFadeReverb.current, 0, 1);

    registerOutput(crossFadeReverb.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    crossFadeFold.current.fade.value = fold;
  }, [fold]);

  useEffect(() => {
    crossFadeReverb.current.fade.value = reverb;
  }, [reverb]);

  return (
    <StyledFilter>
      <Group title="Effects">
        <Encoder
          value={fold}
          onChange={setFold}
          label="Fold"
          midiCC={12}
        ></Encoder>
        <Encoder
          value={reverb}
          onChange={setReverb}
          label="Room"
          midiCC={12}
        ></Encoder>
      </Group>
    </StyledFilter>
  );
};
export default EffectsElement;
