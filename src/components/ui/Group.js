import React from "react";
import styled from "astroturf";

const StyledGroup = styled("div")``;

const StyledEncoderGroup = styled("div")`
  display: grid;
  grid-gap: var(--grid-gap);
  margin-bottom: var(--grid-gap);

  &.direction-column {
    grid-auto-flow: column;
  }

  &.direction-row {
    grid-auto-flow: row;
  }
`;

const GroupHeading = styled("h2")`
  padding-left: 4px;
  margin: 0 0 8px 4px;
  font-size: 28px;
  font-weight: normal;
  color: var(--yellow);
`;

const Group = ({ title, children, direction = "column" }) => {
  return (
    <StyledGroup>
      <GroupHeading>{title}</GroupHeading>
      <StyledEncoderGroup direction={direction}>{children}</StyledEncoderGroup>
    </StyledGroup>
  );
};
export default Group;
