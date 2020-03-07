import React from "react";
import styled from "astroturf";

const Button = styled("button")`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-bottom: 8px;

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

const Table = styled("table")`
  display: flex;
  width: 100%;
`;

const TableRow = styled("tr")`
  display: flex;
  justify-content: space-between;
`;

const TableBody = styled("tbody")`
  width: 100%;
`;

const SequencerGrid = ({ grid, clickHandler }) => {
  return (
    <Table>
      <TableBody>
        {grid.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SequencerGrid;
