import React from 'react';
import './App.css';
import GameTicTacToe9x9 from "./components/GameTicTacToe9x9"
import GameSelect from "./components/GameSelect"

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      gameID: "",
      player: "",
    };
	}

  setGameID(id, player) {
    this.setState({
      gameID: id,
      player: player
    });
  }

  render() {
    if (this.state.gameID === "") {
      return (
        <div className="App">
          <GameSelect
            gameID={this.state.gameID}
            setGameID={(id,player) => this.setGameID(id,player)}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <GameTicTacToe9x9 
            gameID={this.state.gameID}
            player={this.state.player}
          /> 
        </div>
      );
    }
  }
}



export default App;
