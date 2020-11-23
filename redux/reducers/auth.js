import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../types/auth";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        token: action.payload.token,
        loading: false,
      };
    case LOGIN_ERROR:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: {},
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
        error: null,
      };
    default:
      return state;
  }
};
