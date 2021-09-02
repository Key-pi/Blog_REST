import { BACKEND_URL } from "../constants/index";

export const TOKEN_URL = BACKEND_URL + "/api/users/me/?format=json";
export const LOGIN = BACKEND_URL + "/auth/login/";
export const CONFIRM_EMAIL = BACKEND_URL + "/auth/password/reset/";
export const RESET_PASSWORD =
  BACKEND_URL + "/auth/rest-auth/password/reset/confirm/"; // uid //token
export const LOG_OUT = BACKEND_URL + "/auth/logout/";
export const REGISTER = BACKEND_URL + "/auth/registration/";
export const CRUD_TASKS = BACKEND_URL + "/api/tasks/"; //task id
export const GET_ALL_TASKS = BACKEND_URL + "/api/tasks/?all";
export const PAGINATE_TASKS = BACKEND_URL + "/api/tasks/?page=";
export const USERS = BACKEND_URL + "/api/users/";
export  const VERIFY_TOKEN =  BACKEND_URL + '/api/token/verify-token/'
