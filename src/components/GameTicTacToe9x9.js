import React, { useContext, useEffect, useReducer } from 'react';
import '../App.css';
import Cell from "./TicTacToeCell"
import InstanceContext from "./InstanceContext"
import API from './Api.js';
import qs from "qs";

const initialState = {
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

const calculateCellWinner = squares => {
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
  if (squares.indexOf(null) === -1) {
    return '-';
  }
  return null;
}

const getArrays = history => {
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  const winners = current.winners.slice();
  return {
    winners: winners,
    squares: squares
  };
}

const handleMove = (state, data) => {
  if (data.player !== state.nextPlayer) {
    return state;
  }
  const history = state.history.slice(0, state.stepNumber + 1);
  const { winners, squares} = getArrays(history);
  const lastActive = state.activeCell;
  squares[data.cell][data.square] = data.player;
  const active = ((squares[data.square].indexOf(null) !== -1) ? data.square.toString() : ((squares[lastActive].indexOf(null) !== -1) ? lastActive.toString() : null));
  if (winners[data.cell] === null) {
    const winner = calculateCellWinner(squares[data.cell]);
    winners[data.cell] = winner;
  }
  return {
    ...state,
    history: history.concat([{
      squares: squares,
      winners: winners
    }]),
    stepNumber: history.length,
    cellWinners: winners,
    nextPlayer: (state.nextPlayer === 'X' ? 'O' : 'X'),
    activeCell: active
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case "GAME_JOINED":
      return {
        ...state,
        source: action.source
      }
    case "MOVE_EVENT":
      return handleMove(state, action.data);
    default:
      return state;
  }
}

export const GameTicTacToe9x9 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state : globalState } = useContext(InstanceContext);
  /*constructor(props) {
    super(props);
    state = 
    this.handleEvents = this.handleEvents.bind(this);
  }*/

  const handleEvents = message => {
    var data = JSON.parse(message.data);
    dispatch({
      type: "MOVE_EVENT",
      data: data
    });
  }
	
  useEffect(() => {
    const href = "http://localhost:5000/join_game/" + globalState.gameID;
    const source = new EventSource(href);
    source.addEventListener('message', handleEvents)
    dispatch({
      type: "GAME_JOINED",
		  source : source,
    });
  }, [globalState.gameID])

  const calculateWinner = winners => {
    var xWonCells = 0;
    var oWonCells = 0;
    for (let i = 0; i < winners.length; i++) {
      if (winners[i] === 'X') {
        xWonCells++;
      } else if (winners[i] === 'O') {
        oWonCells++;
      }
    }
    if (xWonCells === 5) {
      return "X";
    }
    if (oWonCells === 5) {
      return "O";
    }

    if (winners.indexOf(null) === -1) {
      if (xWonCells > oWonCells) {
        return "X";
      } else if (oWonCells > xWonCells) {
        return "O";
      }
      return "-";
    }
    return null;
  }

  const handleClick = data => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const {winners, squares} = getArrays(history);
    if (calculateWinner(winners) || squares[data.cell][data.square] 
      || (state.activeCell !== null && state.activeCell !== data.cell.toString())
      || state.nextPlayer !== globalState.player) {
      return;
    }
    const params = {
      gameID : globalState.gameID,
      event : JSON.stringify({
        event: "move",
        cell: data.cell,
        square: data.square,
        player: globalState.player
      }),
    }
    API.post("game_event",  qs.stringify(params));
  }
  
  /*const jumpTo = step => {
    this.setState({
      stepNumber: step,
      nextPlayer: (step % 2) === 0,
    });
  }*/

  const history = state.history.slice(0, state.stepNumber + 1);
  const { winners, squares } = getArrays(history);
  const winner = calculateWinner(winners);
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
    if (winner === "-") {
      status = 'Tie!';
    }
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + state.nextPlayer;
  }
  return (
    <div className="GameTicTacToe"> 
      <div>Game ID: {globalState.gameID}</div>
      <div>Player: {globalState.player}</div>
      <div className="game-info">
        <div><h3>{status}</h3></div>
        <ol>{/*moves*/}</ol>
      </div>
      <div className="ttt9x9-game-board">
      <div className="board-row">
        <Cell
          cellid="0"
          active={state.activeCell}
          winner={state.cellWinners[0]}
          squares={squares[0]}
          onClick={(i) => handleClick(i)}
        />
        <Cell
          cellid="3"
          active={state.activeCell}
          winner={state.cellWinners[3]}
          squares={squares[3]}
          onClick={(i) => handleClick(i)}
        />
        <Cell
          cellid="6"
          active={state.activeCell}
          winner={state.cellWinners[6]}
          squares={squares[6]}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="board-row">
        <Cell
          cellid="1"
          active={state.activeCell}
          winner={state.cellWinners[1]}
          squares={squares[1]}
          onClick={(i) => handleClick(i)}
        />
        <Cell
          cellid="4"
          active={state.activeCell}
          winner={state.cellWinners[4]}
          squares={squares[4]}
          onClick={(i) => handleClick(i)}
        />
        <Cell
          cellid="7"
          active={state.activeCell}
          winner={state.cellWinners[7]}
          squares={squares[7]}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="board-row">
        <Cell
          cellid="2"
          active={state.activeCell}
          winner={state.cellWinners[2]}
          squares={squares[2]}
          onClick={(i) => handleClick(i)}
        />
        <Cell
          cellid="5"
          active={state.activeCell}
          winner={state.cellWinners[5]}
          squares={squares[5]}
          onClick={(i) => handleClick(i)}
        />
        <Cell
          cellid="8"
          active={state.activeCell}
          winner={state.cellWinners[8]}
          squares={squares[8]}
          onClick={(i) => handleClick(i)}
        />
      </div>
      </div>
    </div>
  );
}

export default GameTicTacToe9x9;
