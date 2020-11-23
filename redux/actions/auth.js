import axios from "axios";
import { APIAddress } from "../../config";
import api from "../../utils/api";

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT,
} from "../types/auth";

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

// Login User
export const login = (body) => async (dispatch) => {
  try {
    const res = await api.post("/auth/login", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth/me");
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
