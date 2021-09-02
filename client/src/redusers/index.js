import { combineReducers } from "redux";
import * as actionType from "../actions/index.js";

const tokenInitialState = {
  token: ""
};

const tasksInitialState = {
  data: []
};
const user = (state = tokenInitialState, action) => {
  switch (action.type) {
    case actionType.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

const tasks = (state = tasksInitialState, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,

        data: action.data
      };

    default:
      return state;
  }
};

const appReducer = combineReducers({
  user,
  tasks
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
