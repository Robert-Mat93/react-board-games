import React from 'react';
import '../App.css';
import Cell from "./TicTacToeCell"

class GameTicTacToe9x9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null).map(()=> (new Array(9).fill(null))),
        winners: Array(9).fill(null)
      }],
      stepNumber: 0,
      cellWinners: Array(9).fill(null),
      xIsNext: true,
      activeCell: null
    };
  }

  calculateCellWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if ((squares[a]) && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  calculateWinner(winners) {
    var xWonCells = 0;
    var oWonCells = 0;
    for (let i = 0; i < winners.length; i++) {
      if (winners[i] === 'X') {
        xWonCells++;
      }else if (winners[i] === 'O') {
        oWonCells++;
      }
    }
    if (xWonCells === 5) {
      return "X";
    }
    if (oWonCells === 5) {
      return "O";
    }
    return null;
  }

  handleClick(data) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const origCurrent = history[history.length - 1];
    let current = origCurrent;
    const squares = current.squares.slice();
    const winners = current.winners.slice();
    if (this.calculateWinner(winners) || squares[data.cell][data.square] || (this.state.activeCell !== null && this.state.activeCell !== data.cell.toString())) {
      return;
    }
    squares[data.cell][data.square] = this.state.xIsNext ? 'X' : 'O';
    const winner = this.calculateCellWinner(squares[data.cell]);
    const active = ((squares[data.square].indexOf(null) !== -1) ? data.square.toString() : null);
    winners[data.cell] = winner;
    this.setState({
      history: history.concat([{
        squares: squares,
        winners: winners
      }]),
      stepNumber: history.length,
      cellWinners: winners,
      xIsNext: !this.state.xIsNext,
      activeCell: active
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  setWinner(cell, winner) {
    this.setState({
      history: this.state.history,
      stepNumber: this.state.stepNumber,
      xIsNext: this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const winners = current.winners.slice();
    const winner = this.calculateWinner(winners);
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="GameTicTacToe">
        <div className="ttt9x9-game-board">
        <div className="board-row">
          <Cell
            cellid="0"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[0]}
            squares={current.squares[0]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="3"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[3]}
            squares={current.squares[3]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="6"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[6]}
            squares={current.squares[6]}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="board-row">
          <Cell
            cellid="1"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[1]}
            squares={current.squares[1]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="4"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[4]}
            squares={current.squares[4]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="7"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[7]}
            squares={current.squares[7]}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="board-row">
          <Cell
            cellid="2"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[2]}
            squares={current.squares[2]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="5"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[5]}
            squares={current.squares[5]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="8"
            active={this.state.activeCell}
            setWinner={(cell, winner) => this.setWinner(cell, winner)}
            winner={this.state.cellWinners[8]}
            squares={current.squares[8]}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default GameTicTacToe9x9;
