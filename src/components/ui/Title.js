import React from "react";
import styled from "astroturf";

const StyledTitle = styled("h1")`
  grid-area: logo;
  text-align: center;
  color: var(--yellow);
  line-height: 0.8;
  font-weight: normal;
  margin: 0 0 20px 0;
  font-size: 70px;

  @media (min-width: 600px) {
    text-align: left;
    font-size: 100px;
  }

  span:nth-child(1) {
    letter-spacing: -0.018em;
  }

  span:nth-child(2) {
    letter-spacing: -0.015em;
  }

  span:nth-child(3) {
    letter-spacing: 0.02em;
  }
`;

const Title = () => {
  return (
    <StyledTitle>
      nud<span>e</span>lh<span>o</span>
      <span>l</span>z
    </StyledTitle>
  );
};
export default Title;
