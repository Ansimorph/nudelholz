import React from "react";
import styled from "astroturf";

const StyledLinks = styled("footer")`
  padding: var(--grid-gap);
`;
const StyledList = styled("ul")`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  > * + * {
    margin-left: var(--grid-gap);
  }
`;

const Links = () => {
  return (
    <StyledLinks>
      <StyledList>
        <li>
          <a href="https://github.com/Ansimorph/nudelholz">Github</a>
        </li>
        <li>
          <a href="https://ganslandt.xyz">Made by Ganslandt.xyz</a>
        </li>
      </StyledList>
    </StyledLinks>
  );
};
export default Links;
