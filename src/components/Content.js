import React from "react";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gameID: ""};
  }

  updateGameID(id) {
    this.setState({gameID: id});
  }

  render() {
    return (
  <div className="modal">
    <div className="header"> Enter game id </div>
    <div className="content">
      <input type="text" name="gameID" className="joinInput" value={this.state.gameID} onChange={event => this.updateGameID(event.target.value)}/>
      <button className="joinButton" onClick={() => this.props.confirm(this.state.gameID)}>
        Join
      </button>
    </div>
  </div>
    );
  }
}

export default Content;
