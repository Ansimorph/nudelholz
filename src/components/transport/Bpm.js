import React, { useEffect, useState } from "react";
import { Transport } from "tone";
import styled from "astroturf";
import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledEnvelope = styled("div")`
  grid-area: bpm;
`;

const BpmControl = () => {
  const [bpm, setBpm] = useState(0.5);

  useEffect(() => {
    Transport.bpm.value = mapBpm(bpm);
  }, [bpm]);

  const mapBpm = value => Math.round(value * 300);

  return (
    <StyledEnvelope>
      <Group title="BPM">
        <Encoder
          value={bpm}
          onChange={setBpm}
          label={mapBpm(bpm)}
          midiCC={15}
        ></Encoder>
      </Group>
    </StyledEnvelope>
  );
};
export default BpmControl;
