import axios from "axios";
import User from "../../../BearfootAPI/server/models/User";
import { APIAddress } from "../../config";
import api from "../../utils/api";

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
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

// Patch user
export const updateUserRequest = () => {
  return {
    type: UPDATE_USER_REQUEST,
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

export const updateUserError = (error) => {
  return {
    type: UPDATE_USER_ERROR,
    payload: error,
  };
};

export const updateUser = (body) => {
  console.log(body);
  return (dispatch) => {
    dispatch(updateUserRequest);
    api
      .request({
        method: "PATCH",
        url: "users/",
        user: body,
      })
      .then((response) => {
        const user = response.user;
        dispatch(updateUserSuccess(user));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateUserError(errorMsg));
      });
  };
};
