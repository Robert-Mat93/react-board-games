import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GameTicTacToe from "./components/GameTicTacToe"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <GameTicTacToe /> 
      </div>
    );
  }
}



export default App;
