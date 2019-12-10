import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GameTicTacToe9x9 from "./components/GameTicTacToe9x9"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <GameTicTacToe9x9 /> 
      </div>
    );
  }
}



export default App;
