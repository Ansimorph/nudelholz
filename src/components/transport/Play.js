import React, { useContext } from "react";
import Tone, { Transport } from "tone";
import styled from "astroturf";
import PlayStateContext from "../../playStateContext";

const StyledButton = styled("button")`
  grid-area: play;
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

  &.playing-false {
    > span {
      animation: pulse 1s infinite;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    49% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;

const PlayButton = () => {
  const { playing, onChange } = useContext(PlayStateContext);

  const play = () => {
    if (!playing) {
      Tone.start().then(() => {
        onChange(true);
        Transport.start();
      });
    } else {
      Transport.stop();
      onChange(false);
    }
  };

  return (
    <StyledButton onClick={() => play()} playing={playing.toString()}>
      <span>{playing ? "Stop" : "Play"}</span>
    </StyledButton>
  );
};
export default PlayButton;
