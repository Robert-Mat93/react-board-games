import React from 'react';
import '../App.css';
import Cell from "./TicTacToeCell"
import API from './Api.js';
import qs from "qs";

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
      nextPlayer: 'X',
      activeCell: null,
      source: null
    };
  }
  
  setEventListener() {
    const { source } = this.state
    source.addEventListener('message', message => {
      var data = JSON.parse(message.data);
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const origCurrent = history[history.length - 1];
      let current = origCurrent;
      const squares = current.squares.slice();
      const winners = current.winners.slice();
      squares[data.cell][data.square] = this.state.nextPlayer;
      const winner = this.calculateCellWinner(squares[data.cell]);
      const lastActive = this.state.activeCell;
      const active = ((squares[data.square].indexOf(null) !== -1) ? data.square.toString() : ((squares[lastActive].indexOf(null) !== -1) ? lastActive.toString() : null));
      winners[data.cell] = winner;
      this.setState({
        history: history.concat([{
          squares: squares,
          winners: winners
        }]),
        stepNumber: history.length,
        cellWinners: winners,
        nextPlayer: (this.state.nextPlayer === 'X' ? 'O' : 'X'),
        activeCell: active
      });
    })
  }
	
  componentDidMount () {
    const href = "http://3.122.179.159:5000/join_game/" + this.props.gameID;
    this.setState({
		  source : new EventSource(href),
    }, this.setEventListener);
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
    if (this.calculateWinner(winners) || squares[data.cell][data.square] 
      || (this.state.activeCell !== null && this.state.activeCell !== data.cell.toString())
      || this.state.nextPlayer !== this.props.player) {
      return;
    }
    const params = {
      gameID : this.props.gameID,
      event : JSON.stringify({
        event: "move",
        cell: data.cell,
        square: data.square,
        player: this.props.player
      }),
    }
    API.post("game_event",  qs.stringify(params));
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      nextPlayer: (step % 2) === 0,
    });
  }


  render() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const winners = current.winners.slice();
    const winner = this.calculateWinner(winners);
    /*const moves = history.map((step, move) => {
    const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });*/
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.state.nextPlayer;
    }
    return (
      <div className="GameTicTacToe"> 
        <div>Game ID: {this.props.gameID}</div>
        <div>Player: {this.props.player}</div>
        <div className="game-info">
          <div><h3>{status}</h3></div>
          <ol>{/*moves*/}</ol>
        </div>
        <div className="ttt9x9-game-board">
        <div className="board-row">
          <Cell
            cellid="0"
            active={this.state.activeCell}
            winner={this.state.cellWinners[0]}
            squares={current.squares[0]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="3"
            active={this.state.activeCell}
            winner={this.state.cellWinners[3]}
            squares={current.squares[3]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="6"
            active={this.state.activeCell}
            winner={this.state.cellWinners[6]}
            squares={current.squares[6]}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="board-row">
          <Cell
            cellid="1"
            active={this.state.activeCell}
            winner={this.state.cellWinners[1]}
            squares={current.squares[1]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="4"
            active={this.state.activeCell}
            winner={this.state.cellWinners[4]}
            squares={current.squares[4]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="7"
            active={this.state.activeCell}
            winner={this.state.cellWinners[7]}
            squares={current.squares[7]}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="board-row">
          <Cell
            cellid="2"
            active={this.state.activeCell}
            winner={this.state.cellWinners[2]}
            squares={current.squares[2]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="5"
            active={this.state.activeCell}
            winner={this.state.cellWinners[5]}
            squares={current.squares[5]}
            onClick={(i) => this.handleClick(i)}
          />
          <Cell
            cellid="8"
            active={this.state.activeCell}
            winner={this.state.cellWinners[8]}
            squares={current.squares[8]}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        </div>
      </div>
    );
  }
}

export default GameTicTacToe9x9;
