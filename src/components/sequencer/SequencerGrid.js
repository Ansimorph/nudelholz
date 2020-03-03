import React from "react";
import styled from "astroturf";

const Button = styled("button")`
  width: 40px;
  height: 40px;
  border-radius: 51% 49% 53% 47% / 58% 50% 50% 42%;
  border: none;
  cursor: pointer;
  margin: 2px;

  &.color-off {
    background-color: var(--white);
    opacity: 30%;
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
