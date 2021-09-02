import * as actionType from "../constants/index.js";

export const setToken = data => {
  return {
    type: actionType.SET_TOKEN,
    data
  };
};
export const SET_TOKEN = "SET_TOKEN";

export const setTask = data => ({
  type: actionType.SET_TASK,
  data
});
