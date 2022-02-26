import {
  FETCH_AREA_ERROR,
  FETCH_AREA_REQUEST,
  FETCH_AREA_SUCCESS,
  FETCH_AREA_POOLS_ERROR,
  FETCH_AREA_POOLS_SUCCESS,
  ADD_AREA_REQUEST,
  ADD_AREA_SUCCESS,
  ADD_AREA_ERROR,
} from "../types/area";

const initialState = {
  data: [],
  loading: false,
  error: null,
  pools: [],
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
    case ADD_AREA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case ADD_AREA_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case FETCH_AREA_POOLS_SUCCESS:
      return {
        ...state,
        pools: action.payload,
      };
    case FETCH_AREA_POOLS_ERROR:
      return {
        ...state,
        error: action.payload,
        pools: [],
        loading: false,
      };
    default:
      return state;
  }
};
