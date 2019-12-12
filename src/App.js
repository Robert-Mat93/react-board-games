import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import GameTicTacToe9x9 from "./components/GameTicTacToe9x9"

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      gameID: "",
      messages: [],
      source: null,
    };
	}

  setEventListener() {
    const { source } = this.state
    source.addEventListener('message', message => {
      const messages = this.state.messages.slice()
      console.log(messages);
      console.log(messages.concat(message.data));
      this.setState({ messages: messages.concat(message.data)})
    })
  }

	componentDidMount () {
    axios.get(`http://localhost:5000/start_game`)
      .then(res => {
      const data = res.data;
        console.log(data);
      const href = "http://localhost:5000/join_game/" + data.game_id;
      this.setState({
        gameID: data.game_id,
		    source : new EventSource(href),
        messages: ['hello', 'world'] 
      }, this.setEventListener);
    })
  }

  render() {
    return (
      <div className="App">
        <GameTicTacToe9x9 /> 
        <ul>
        {this.state.messages.map(m => (<li>{m}</li>))}
        </ul>
      </div>
    );
  }
}



export default App;
