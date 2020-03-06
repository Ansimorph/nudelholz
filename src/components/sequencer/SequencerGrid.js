import React from "react";
import styled from "astroturf";

const Button = styled("button")`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin: 2px;

  &:focus {
    outline: none;
    box-shadow: var(--focus-box-shadow);
  }

  &.color-off {
    background-color: var(--inactive);
  }

  &.color-on {
    background-color: var(--yellow);
  }

  &.color-playing {
    background-color: var(--blue);
  }
`;

const SequencerGrid = ({ grid, clickHandler }) => {
  return (
    <table>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <td key={rowIndex + columnIndex}>
                <Button
                  color={cell}
                  aria-label={cell}
                  onClick={e => {
                    clickHandler({ x: columnIndex, y: rowIndex });
                  }}
                ></Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SequencerGrid;
