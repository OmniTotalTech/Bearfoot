import {
  FETCH_AREA_ERROR,
  FETCH_AREA_REQUEST,
  FETCH_AREA_SUCCESS,
} from "../types/area";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AREA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_AREA_ERROR:
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
