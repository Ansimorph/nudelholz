import styled from "astroturf";

const Layout = styled("main")`
  display: grid;
  grid-gap: var(--grid-gap);
  padding: 15px 30px 15px 15px;
  background-color: var(--red);
  border-radius: 10px;

  grid-template-columns: repeat(4, max-content);
  grid-template-rows: repeat(8, max-content);
  grid-template-areas:
    "logo    logo    logo  logo"
    "osc1    osc2    noise lfo"
    "osc1    osc2    noise lfo"
    "env     env     env   lfo"
    "filter  filter  fx    fx"
    "seq     seq     seq   seq"
    "seq     seq     seq   seq"
    "seq     seq     seq   seq";

  @media (min-width: 920px) {
    padding: 30px;
    grid-template-columns: repeat(8, max-content);
    grid-template-rows: repeat(4, max-content);
    grid-template-areas:
      "logo    logo    logo  logo  bla     bla     bla   bla"
      "osc1    osc1    osc2  osc2  noise   lfo     lfo   lfo"
      "filter  filter  fx    fx    seq     seq     seq   seq"
      "env     env     env   null  seq     seq     seq   seq";
  }
`;

export default Layout;
