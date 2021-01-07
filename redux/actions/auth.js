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
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  VERIFY_PHONE_ERROR,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_REQUEST,
  VERIFY_CODE_ERROR,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  NEW_USER_ERROR,
  NEW_USER_SUCCESS,
  NEW_USER_REQUEST,
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

// Patch user
export const verifyUserPhoneRequest = () => {
  return {
    type: VERIFY_PHONE_REQUEST,
  };
};

export const verifyUserPhoneSuccess = (data) => {
  return {
    type: VERIFY_PHONE_SUCCESS,
    payload: data,
  };
};

export const verifyUserPhoneError = (error) => {
  return {
    type: VERIFY_PHONE_ERROR,
    payload: error,
  };
};

//
// Verify Code
export const verifyCodeRequest = () => {
  return {
    type: VERIFY_CODE_REQUEST,
  };
};

export const verifyCodeSuccess = (data) => {
  return {
    type: VERIFY_CODE_SUCCESS,
    payload: data,
  };
};

export const verifyCodeError = (error) => {
  return {
    type: VERIFY_CODE_ERROR,
    payload: error,
  };
};

//
// Verify Code
export const newUserRequest = () => {
  return {
    type: NEW_USER_REQUEST,
  };
};

export const newUserSuccess = (data) => {
  return {
    type: NEW_USER_SUCCESS,
    payload: data,
  };
};

export const newUserError = (error) => {
  return {
    type: NEW_USER_ERROR,
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
        data: body,
      })
      .then((response) => {
        const user = response.user;
        dispatch(updateUserSuccess(user)).then((res) => {
          dispatch(loadUser());
        });
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateUserError(errorMsg));
      });
  };
};

export const verifyUserPhone = (phone) => {
  console.log(phone);
  return (dispatch) => {
    console.log(phone);
    dispatch(verifyUserPhoneRequest);
    api
      .request({
        method: "POST",
        url: "users/phone/verify",
        data: { phone: phone },
      })
      .then((response) => {
        dispatch(verifyUserPhoneSuccess(response));
      })
      .catch((error) => {
        dispatch(verifyUserPhoneError(error));
      });
  };
};

export const verifyCode = (code, phone) => {
  return (dispatch) => {
    dispatch(verifyCodeRequest);
    api
      .request({
        method: "POST",
        url: "users/phone/verify/" + code,
        data: { phone: phone },
      })
      .then((response) => {
        dispatch(verifyCodeSuccess(response));
      })
      .catch((error) => {
        dispatch(verifyCodeError(error));
      });
  };
};

export const newUser = (body) => {
  return (dispatch) => {
    dispatch(newUserRequest);
    api
      .request({
        method: "POST",
        url: "auth/register",
        data: body,
      })
      .then((res) => {
        dispatch(newUserSuccess(res));
      })
      .catch((error) => {
        dispatch(newUserError(error));
      });
  };
};
