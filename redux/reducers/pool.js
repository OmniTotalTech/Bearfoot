import {
  FETCH_POOL_ERROR,
  FETCH_POOL_REQUEST,
  FETCH_POOL_SUCCESS,
} from "../types/pool";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_POOL_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
