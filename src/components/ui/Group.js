import React from "react";
import styled from "astroturf";

const StyledGroup = styled("div")``;

const StyledEncoderGroup = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GroupHeading = styled("h2")`
  padding-left: 4px;
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: normal;
  color: var(--yellow);
`;

const Group = ({ title, children }) => {
  return (
    <StyledGroup>
      <GroupHeading>{title}</GroupHeading>
      <StyledEncoderGroup>{children}</StyledEncoderGroup>
    </StyledGroup>
  );
};
export default Group;
