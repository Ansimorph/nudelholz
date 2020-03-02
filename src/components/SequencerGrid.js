import React from "react";
import styled from "astroturf";

const Button = styled("button")`
  color: black;
  border: 1px solid black;
  background-color: white;

  &.color-red {
    color: red;
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
                  onClick={e => {
                    clickHandler({ x: columnIndex, y: rowIndex });
                  }}
                >
                  {cell}
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SequencerGrid;
