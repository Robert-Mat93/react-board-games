import React from 'react';
import Popup from "reactjs-popup";
import Content from "./Content.js";
import API from './Api.js';
import '../App.css';

class GameSelect extends React.Component {
	startGame() {
    API.get(`start_game`)
      .then(res => {
      const data = res.data;
      if (data.hasOwnProperty('game_id')) {
  		  this.props.setGameID(data.game_id, "X");
      }
    })
 	}

 	joinGame(gameID) {
    this.props.setGameID(gameID, "O");
 	}

	render() {
		return (
			<div className="GameSelect">
				<button className="start"  onClick={() => this.startGame()}>
      				New Game
    			</button>
        <div>
          <Popup modal className="popup" trigger={
    			  <button className="join">
    			    Join Game
            </button>}>
            <Content
              confirm = {(id) => this.joinGame(id)}
            />
          </Popup>
        </div>
			</div>
		);
	}
}

export default GameSelect;
