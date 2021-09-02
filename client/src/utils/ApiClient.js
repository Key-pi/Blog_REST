import axios from "axios";
import store from "../store.js";
import { BACKEND_URL } from "../constants/index";

export const apiClient = function() {
  const token = store.getState().token;
  const params = {
    baseURL: BACKEND_URL,
    headers: { Authorization: "Token " + token }
  };
  return axios.create(params);
};
