import React from 'react';
import axios from 'axios';
import '../App.css';

class GameSelect extends React.Component {
	startGame() {
		this.props.setGameID("5");
 	}

 	joinGame() {
 	}

	render() {
		return (
			<div className="GameSelect">
				<button className="start"  onClick={() => this.startGame()}>
      				New Game
    			</button>
    			<button className="join" onClick={() => this.joinGame()}>
      				Join Game
    			</button>
			</div>
		);
	}
}

export default GameSelect;