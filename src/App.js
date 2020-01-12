import React, { useReducer, useEffect } from "react";
import "./App.css";
import GameTicTacToe9x9 from "./components/GameTicTacToe9x9";
import GameSelect from "./components/GameSelect";
import InstanceContext from "./components/InstanceContext";
import UserRegistration from "./components/UserRegistration";

const initialState = {
  userName: "",
  userID: "",
  gameID: "",
  player: "",
  source: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        gameID: action.gameID,
        player: action.player
      };
    case "USER_CONNECT":
      return {
        ...state,
        source: action.source
      };
    default:
      return state;
  }
};

function handleEvents() {}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getElement = () => {
    if (state.userID === "") {
      return (
        <div className="App">
          <UserRegistration />
        </div>
      );
    } else if (state.gameID !== "") {
      return (
        <div className="App">
          <GameTicTacToe9x9 />
        </div>
      );
    } else {
      return (
        <div className="App">
          <GameSelect />
        </div>
      );
    }
  };

  useEffect(() => {
    if (state.userID !== "") {
      const href = "http://localhost:5000/user/" + state.userID;
      const source = new EventSource(href);
      source.addEventListener("message", handleEvents);
      dispatch({
        type: "USER_CONNECT",
        source: source
      });
    }
  }, [state.userID]);

  return (
    <InstanceContext.Provider value={{ state, dispatch }}>
      {getElement()}
    </InstanceContext.Provider>
  );
}

export default App;
