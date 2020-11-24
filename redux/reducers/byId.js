import {
  FETCH_BY_ID_ERROR,
  FETCH_BY_ID_REQUEST,
  FETCH_BY_ID_SUCCESS,
} from "../types/byId";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };
    case FETCH_BY_ID_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
