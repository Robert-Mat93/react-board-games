import React from 'react';
import Popup from "reactjs-popup";
import Content from "./Content.js";
import API from './Api.js';
import InstanceContext from "./InstanceContext"
import '../App.css';

function GameSelect () {
	const { dispatch } = React.useContext(InstanceContext);

	const startGame = () => {
		API.get(`start_game`)
		  .then(res => {
		  const data = res.data;
		  if (data.hasOwnProperty('game_id')) {
				dispatch({
					type: "START_GAME",
					gameID: data.game_id,
					player: "X"
				})
		  }
		})
	};
	
	const joinGame = (gameID) => {
		dispatch({
			type: "START_GAME",
			gameID: gameID,
			player: "O"
		})
	}

	return (
		<div className="GameSelect">
			<button className="start"  onClick={() => startGame()}>
				New Game
			</button>
			<div>
			<Popup modal className="popup" trigger={
				<button className="join">
				Join Game
			</button>}>
			<Content
				confirm = {(id) => joinGame(id)}
			/>
			</Popup>
			</div>
		</div>
	);
}

export default GameSelect;
