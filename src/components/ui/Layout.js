import styled from "astroturf";

const Layout = styled("main")`
  display: grid;
  grid-gap: var(--grid-gap);
  padding: 20px 12px 15px 10px;
  background-color: var(--red);
  border-radius: 10px;

  grid-template-columns: repeat(2, var(--encoder-size)) calc(
      var(--encoder-size) + 40px
    );
  grid-template-rows: repeat(auto, max-content);
  grid-template-areas:
    "logo    logo   logo"
    "noise   .      play"
    "osc1    osc1   osc1"
    "osc2    osc2   osc2"
    "lfo     lfo    lfo"
    "filter  filter filter"
    "fx      fx     fx"
    "env     env    env"
    "env     env    env"
    "bpm     .      ."
    "seq     seq    seq"
    "seq     seq    seq";

  @media (min-width: 600px) {
    padding: 30px 40px 15px 20px;
    grid-template-columns:
      repeat(1, var(--encoder-size)) 18px
      repeat(3, var(--encoder-size));
    /* grid-template-rows: repeat(8, max-content); */
    grid-template-areas:
      "logo    logo    logo   logo  play"
      "osc1    osc1    osc1   osc2  osc2"
      "noise   noise   lfo    lfo   lfo"
      "filter  filter  filter fx    fx"
      "env     env     env    env   bpm"
      "seq     seq     seq     seq   seq"
      "seq     seq     seq     seq   seq";
  }

  @media (min-width: 1080px) {
    padding: 30px 50px 30px 30px;
    grid-template-columns:
      repeat(2, var(--encoder-size)) 18px
      repeat(2, var(--encoder-size)) 18px
      repeat(1, var(--encoder-size)) 18px
      repeat(3, var(--encoder-size));
    grid-template-areas:
      "logo    logo    logo   logo  logo  .       .       .       .       .     play"
      "osc1    osc1    osc1   osc2  osc2  osc2    noise   noise   lfo     lfo   lfo"
      "filter  filter  filter fx    fx    fx      seq     seq     seq     seq   seq"
      "env     env     env    env   bpm   bpm     seq     seq     seq     seq   seq";
  }
`;

export default Layout;
