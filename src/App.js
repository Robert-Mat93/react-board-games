import React, { useReducer } from 'react';
import './App.css';
import GameTicTacToe9x9 from "./components/GameTicTacToe9x9"
import GameSelect from "./components/GameSelect"
import InstanceContext from "./components/InstanceContext"

const initialState = {
  gameID: "",
  player: "",
}

const reducer = (state, action) => {
  switch(action.type) {
    case "START_GAME":
      return {
        ...state,
        gameID: action.gameID,
        player: action.player
      };
    default:
      return state;
  }
};

function App () {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InstanceContext.Provider value={{state, dispatch}}>
      {state.gameID === "" ?
        <div className="App">
          <GameSelect />
        </div>
    :
        <div className="App">
          <GameTicTacToe9x9 /> 
        </div>
      }
    </InstanceContext.Provider>
  );
}



export default App;
