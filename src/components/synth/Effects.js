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
  let reverbNode = useRef();

  const [fold, setFold] = useState(0.5);
  const [reverb, setReverb] = useState(0.5);

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

  //Setup Reverb
  useEffect(() => {}, []);

  useEffect(() => {
    crossFadeFold.current.fade.value = fold;
  }, [fold]);

  useEffect(() => {
    reverbNode.current.set("wet", reverb);
  }, [reverb]);

  return (
    <StyledFilter>
      <Group title="Effects">
        <Encoder
          value={fold}
          onChange={setFold}
          label="Fold"
          midiCC={14}
        ></Encoder>
        <Encoder
          value={reverb}
          onChange={setReverb}
          label="Room"
          midiCC={15}
        ></Encoder>
      </Group>
    </StyledFilter>
  );
};
export default EffectsElement;
