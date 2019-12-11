import React from 'react';
import '../App.css';

function Square(props) {
  return (
    <button className={"square " + (props.value === "X" ? 'set-x': (props.value ==="O" ? 'set-o' : ''))} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.props.squares,
      cellid : props.cellid
    }
  }

  onClick(data) {
    this.props.onClick(data)
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.onClick({cell:this.props.cellid, square: i})}
      />
    );
  }

  render() {
    return (
      <div className={"cell " + (this.props.active === this.props.cellid ? 'active ' : ' ') + (this.props.winner === "X" ? 'winner-x': (this.props.winner ==="O" ? 'winner-o' : ''))}>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Cell;
