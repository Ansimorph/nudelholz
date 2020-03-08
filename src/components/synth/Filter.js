import React, { useRef, useEffect, useState } from "react";
import { Filter } from "tone";
import styled from "astroturf";
import Encoder from "../ui/Encoder";
import Group from "../ui/Group";

const StyledFilter = styled("div")`
  grid-area: filter;
`;

const FilterElement = ({ register }) => {
  let filter = useRef();

  const [frequency, setFrequency] = useState(0.9);
  const [resonance, setResonance] = useState(1);

  useEffect(() => {
    filter.current = new Filter();

    register(filter.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    filter.current.set("frequency", Math.pow(frequency, 2) * 20000);
  }, [frequency]);

  useEffect(() => {
    filter.current.set("Q", resonance * 10);
  }, [resonance]);

  return (
    <StyledFilter>
      <Group title="Filter">
        <Encoder
          value={frequency}
          onChange={setFrequency}
          label="Freq"
          midiCC={12}
        ></Encoder>
        <Encoder
          value={resonance}
          onChange={setResonance}
          label="Res"
          midiCC={13}
        ></Encoder>
      </Group>
    </StyledFilter>
  );
};
export default FilterElement;
