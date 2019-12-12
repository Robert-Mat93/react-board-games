import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GameTicTacToe9x9 from "./components/GameTicTacToe9x9"

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
		  source : new EventSource("http://localhost:5000/"),
      messages: ['hello', 'world'] 
    }
	}

	componentDidMount () {
    const { source } = this.state
    source.addEventListener('message', message => {
      const messages = this.state.messages.slice()
      console.log(messages);
      console.log(messages.concat(message.data));
      this.setState({ messages: messages.concat(message.data)})
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
