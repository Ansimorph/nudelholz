import React, { useRef, useEffect } from "react";
import { Filter, Scale, ScaleExp } from "tone";
import styled from "astroturf";
import SignalEncoder from "../ui/SignalEncoder";
import Group from "../ui/Group";

const StyledFilter = styled("div")`
  grid-area: filter;
`;

const FilterElement = ({ register }) => {
  const filter = useRef();
  let frequencyControlSignal = useRef();
  let resonanceControlSignal = useRef();

  useEffect(() => {
    filter.current = new Filter();

    register(filter.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const scale = new ScaleExp(0, 20000, 2);
    frequencyControlSignal.connect(scale);
    scale.connect(filter.current.frequency);

    return function cleanup() {
      scale.dispose();
    };
  }, [resonanceControlSignal]);

  useEffect(() => {
    const scale = new Scale(0, 10);
    resonanceControlSignal.connect(scale);
    scale.connect(filter.current.Q);

    return function cleanup() {
      scale.dispose();
    };
  }, [resonanceControlSignal]);

  useEffect(() => {
    frequencyControlSignal.connect(filter.current.frequency);
  }, [frequencyControlSignal]);

  const handleFrequencyControlSignal = signalRef => {
    frequencyControlSignal = signalRef;
  };

  const handleResonanceControlSignal = signalRef => {
    resonanceControlSignal = signalRef;
  };

  return (
    <StyledFilter>
      <Group title="Filter">
        <SignalEncoder
          label="Freq"
          midiCC={12}
          defaultValue={1}
          registerSignal={handleFrequencyControlSignal}
        ></SignalEncoder>
        <SignalEncoder
          label="Res"
          midiCC={13}
          defaultValue={0}
          registerSignal={handleResonanceControlSignal}
        ></SignalEncoder>
      </Group>
    </StyledFilter>
  );
};
export default FilterElement;
