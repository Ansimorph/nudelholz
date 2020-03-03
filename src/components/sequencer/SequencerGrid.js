import React from "react";
import styled from "astroturf";

const Button = styled("button")`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;

  &.color-off {
    background-color: lightgray;
  }

  &.color-on {
    background-color: red;
  }

  &.color-playing {
    background-color: orange;
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
