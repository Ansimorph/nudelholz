import React from "react";
import styled from "astroturf";

const StyledGroup = styled("div")`
  margin-right: calc(var(--grid-gap) / 2);
  margin-bottom: calc(var(--grid-gap) / 2);

  @media (min-width: 600px) {
    margin-right: calc(var(--grid-gap) * 2);
  }
`;

const StyledEncoderGroup = styled("div")`
  display: grid;
  grid-gap: var(--grid-gap);

  @media (min-width: 600px) {
    grid-auto-flow: column;
    grid-template-columns: auto;
  }
`;

const GroupHeading = styled("h2")`
  padding-left: 4px;
  margin: 0 0 8px 4px;
  font-size: 28px;
  font-weight: normal;
  color: var(--yellow);
`;

const Group = ({ title, children }) => {
  return (
    <StyledGroup>
      {title && <GroupHeading>{title}</GroupHeading>}
      <StyledEncoderGroup>{children}</StyledEncoderGroup>
    </StyledGroup>
  );
};
export default Group;
