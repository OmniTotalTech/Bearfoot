import {
  FETCH_RECORDS_ERROR,
  FETCH_RECORDS_REQUEST,
  FETCH_RECORDS_SUCCESS,
} from "../types/records";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECORDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case FETCH_RECORDS_ERROR:
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
