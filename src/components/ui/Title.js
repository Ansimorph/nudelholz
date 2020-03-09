import React from "react";
import styled from "astroturf";

const StyledTitle = styled("h1")`
  grid-area: logo;
  text-align: left;
  font-size: 100px;
  color: var(--yellow);
  line-height: 0.8;
  font-weight: normal;
  margin: 0 0 20px 0;
`;

const Title = () => {
  return <StyledTitle>nudelholz</StyledTitle>;
};
export default Title;
