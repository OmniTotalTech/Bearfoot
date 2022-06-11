import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  VERIFY_PHONE_ERROR,
  VERIFY_PHONE_REQUEST,
  VERIFY_PHONE_SUCCESS,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_ERROR,
  NEW_USER_ERROR,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS,
} from "../types/auth";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
  user: {
    name: "",
  },
  verification: {
    data: {
      success: null,
      data: {},
    },
  },
  codeVerified: null,
  otherMessage: null,
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
        error: "Invalid Credentials.",
        user: {},
      };
    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
        error: null,
      };

    // update user
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.payload,
        loading: false,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: {
          name: " ",
        },
        error: action.payload,
      };
    case VERIFY_PHONE_SUCCESS:
      return {
        ...state,
        verification: action.payload,
      };
    case VERIFY_PHONE_ERROR:
      return {
        ...state,
        verification: action.payload,
      };
    case VERIFY_PHONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        codeVerified: true,
        verification: action.payload,
      };
      case VERIFY_CODE_ERROR:
      return {
        ...state,
        codeVerified: false,
        verification: action.payload,
      };
    case VERIFY_PHONE_ERROR:
      return {
        ...state,
        codeVerified: false,
        verification: action.payload,
      };
    case NEW_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_USER_SUCCESS:
      return {
        ...state,
        otherMessage: action.payload.message,
      };
    case NEW_USER_ERROR:
      return {
        ...state,
        otherMessage: action.payload.message,
      };
    default:
      return state;
  }
};
