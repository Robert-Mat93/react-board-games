import React from 'react';
import './App.css';
import GameTicTacToe9x9 from "./components/GameTicTacToe9x9"
import GameSelect from "./components/GameSelect"

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      gameID: "",
    };
	}

  setGameID(id) {
    this.setState({
      gameID: id
    });
  }

  /*setEventListener() {
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
  }*/

  render() {
    if (this.state.gameID === "") {
      return (
        <div className="App">
          <GameSelect
            gameID={this.state.gameID}
            setGameID={(id) => this.setGameID(id)}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <GameTicTacToe9x9 /> 
        </div>
      );
    }
  }
}



export default App;
