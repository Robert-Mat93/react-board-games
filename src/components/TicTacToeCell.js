import React from 'react';
import '../App.css';

const Square = ({ value, onClick }) => {
  return (
    <button className={"square " + (value === "X" ? 'set-x': (value ==="O" ? 'set-o' : ''))} onClick={onClick}>
      {value}
    </button>
  );
}

export const Cell = ({ squares, onClick, cellid, active, winner }) => {
  const renderSquare = i => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick({cell:cellid, square: i})}
      />
    );
  }

  return (
    <div className={"cell " + (active === cellid ? 'active ' : ' ') + (winner === "X" ? 'winner-x': (winner ==="O" ? 'winner-o' : ''))}>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Cell;
