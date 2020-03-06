import React from "react";
import styled from "astroturf";

const StyledGroup = styled("div")`
  display: flex;
`;

const GroupHeading = styled("h2")`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 22px;
  font-weight: 500;
  color: var(--yellow);
`;

const Group = ({ title, children }) => {
  return (
    <div>
      <GroupHeading>{title}</GroupHeading>
      <StyledGroup>{children}</StyledGroup>
    </div>
  );
};
export default Group;
