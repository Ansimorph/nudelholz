import styled from "astroturf";

const Layout = styled("main")`
  display: grid;
  grid-gap: var(--grid-gap);
  padding: 15px 5px 15px 15px;
  background-color: var(--red);
  border-radius: 10px;

  grid-template-columns: repeat(2, max-content);
  grid-template-rows: repeat(auto, max-content);
  grid-template-areas:
    "logo    logo"
    "noise   play"
    "lfo     lfo"
    "lfo     lfo"
    "osc1    osc1"
    "osc2    osc2"
    "filter  filter"
    "fx      fx"
    "env     env"
    "env     env"
    "bpm     ."
    "seq     seq"
    "seq     seq";

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, max-content);
    grid-template-rows: repeat(8, max-content);
    grid-template-areas:
      "logo    logo    logo  play"
      "noise   lfo     lfo   lfo"
      "osc1    osc1    osc2  osc2"
      "filter  filter  fx    fx"
      "env     env     env   bpm"
      "seq     seq     seq   seq"
      "seq     seq     seq   seq";
  }

  @media (min-width: 1080px) {
    padding: 30px;
    grid-template-columns: repeat(8, max-content);
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
      "logo    logo    logo  logo  .       .       .     play"
      "osc1    osc1    osc2  osc2  noise   lfo     lfo   lfo"
      "filter  filter  fx    fx    seq     seq     seq   seq"
      "env     env     env   bpm   seq     seq     seq   seq";
  }
`;

export default Layout;
