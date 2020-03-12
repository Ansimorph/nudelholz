import React, { useEffect, useState } from "react";
import { Transport } from "tone";
import styled from "astroturf";

const StyledButton = styled("button")`
  grid-area: play;
  align-self: center;
  border-radius: 50%;
  border: 0;
  background-color: var(--yellow);
  width: calc(var(--button-size) * 2 + 8px);
  height: calc(var(--button-size) * 2 + 8px);
  font-family: var(--font);
  font-size: var(--font-size-input);
  color: var(--red);
  cursor: pointer;
  text-transform: uppercase;

  &:focus {
    outline: none;
    box-shadow: var(--focus-box-shadow);
  }
`;

const PlayButton = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    Transport.bpm.value = 60;
    Transport.seconds = 0;

    if (playing) {
      Transport.start();
    } else {
      Transport.stop();
    }
  }, [playing]);

  return (
    <StyledButton onClick={() => setPlaying(!playing)}>
      {playing ? "Stop" : "Play"}
    </StyledButton>
  );
};
export default PlayButton;
