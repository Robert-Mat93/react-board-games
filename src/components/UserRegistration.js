import React, { Fragment, useEffect, useReducer, useContext } from "react";
import API from "./Api.js";
import InstanceContext from "./InstanceContext";

const initialState = {
  users: [],
  filteredUsers: [],
  loading: false,
  userInput: "",
  activeUser: 0,
  showUserList: false,
  selectedUserID: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERS":
      const users = action.data
        .slice()
        .sort((first, second) => first.Name > second.Name);
      return {
        ...state,
        users: users
      };
    case "CHANGE_FILTER":
      return {
        ...state,
        activeUser: 0,
        showUserList: true,
        userInput: action.userInput,
        filteredUsers: action.filteredUsers,
        selectedUserID: ""
      };
    case "CHANGE_ACTIVE_USER":
      return {
        ...state,
        activeUser: action.activeUser
      };
    case "SELECT_USER":
      return {
        ...state,
        activeUser: 0,
        filteredUsers: [],
        showUserList: false,
        userInput: action.userInput,
        selectedUserID: action.selectedUserID
      };
    case "CONFIRM_SELECTION":
      return confirmSelection(state);
    default:
      return state;
  }
};

const confirmSelection = state => {
  const { filteredUsers, activeUser } = state;
  const newState = {
    ...state,
    activeUser: 0,
    showUserList: false
  };
  if (typeof filteredUsers[activeUser] !== "undefined") {
    newState.userInput = filteredUsers[activeUser].Name;
    newState.selectedUserID = filteredUsers[activeUser].ID;
  }

  return newState;
};
export const UserRegistration = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dispatch: globalDispatch } = useContext(InstanceContext);

  useEffect(() => {
    API.get(`user_list`).then(res => {
      const data = res.data;
      dispatch({
        type: "UPDATE_USERS",
        data: data
      });
    });
  }, []);

  const onChange = e => {
    const users = state.users.slice();
    const userInput = e.currentTarget.value;

    // Filter our users that don't contain the user's input
    const filteredUsers = users.filter(
      user => user.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    dispatch({
      type: "CHANGE_FILTER",
      filteredUsers: filteredUsers,
      userInput: userInput
    });
  };

  const onClick = e => {
    dispatch({
      type: "SELECT_USER",
      userInput: e.currentTarget.innerText,
      selectedUserID: e.currentTarget.dataset.key
    });
  };

  const onKeyDown = e => {
    const { activeUser, filteredUsers } = state;
    // User pressed the enter key
    if (e.keyCode === 13) {
      dispatch({
        type: "CONFIRM_SELECTION"
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeUser === 0) {
        return;
      }
      dispatch({
        type: "CHANGE_ACTIVE_USER",
        activeUser: activeUser - 1
      });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeUser + 1 === filteredUsers.length) {
        return;
      }

      dispatch({
        type: "CHANGE_ACTIVE_USER",
        activeUser: activeUser + 1
      });
    }
  };

  const confirmSelection = () => {
    if (selectedUserID === "") {
      API.get("create_user", { data: { name: userInput } });
    }
  };

  const { activeUser, filteredUsers, showUserList, userInput } = state;
  let userListComponent;
  let buttonLabel;
  let selectedUserID = state.selectedUserID;
  if (
    selectedUserID === "" &&
    activeUser === 0 &&
    filteredUsers.length &&
    filteredUsers[0].Name.toLowerCase() === userInput.toLowerCase()
  ) {
    selectedUserID = filteredUsers[0].ID;
  }
  if (selectedUserID === "") {
    buttonLabel = "Create";
  } else {
    buttonLabel = "Select";
  }
  if (showUserList && userInput) {
    if (filteredUsers.length) {
      userListComponent = (
        <ul className="UserSelectList">
          {filteredUsers.map((user, index) => {
            let className;
            if (index === activeUser) {
              className = "UserSelectActive";
            }
            return (
              <li
                className={className}
                key={user.Name}
                onClick={onClick}
                data-key={user.ID}
              >
                {user.Name}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
    <div className="UserRegistration">
      <Fragment>
        <p className="RegistrationLabel">Select username</p>
        <div className="RegistrationContainer">
          <input
            className="RegistrationInput"
            type="text"
            onKeyDown={onKeyDown}
            onChange={onChange}
            value={userInput}
          />
          <button
            className="RegistrationButton"
            onClick={confirmSelection}
            disabled={userInput === "" ? true : false}
          >
            {buttonLabel}
          </button>
          {userListComponent}
        </div>
      </Fragment>
    </div>
  );
};

export default UserRegistration;
