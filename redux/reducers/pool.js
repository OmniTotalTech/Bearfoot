import {
  FETCH_POOL_ERROR,
  FETCH_POOL_REQUEST,
  FETCH_POOL_SUCCESS,
  FETCH_POOL_BY_ID_ERROR,
  FETCH_POOL_BY_ID_SUCCESS,
  ADD_POOL_REQUEST,
  ADD_POOL_SUCCESS,
  ADD_POOL_ERROR,
} from "../types/pool";

const initialState = {
  data: {},
  loading: false,
  error: null,
  individualPool: {
    pool_employees: [],
    pool_managers: [],
  },
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
    case FETCH_POOL_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        individualPool: action.payload,
      };
    case FETCH_POOL_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case ADD_POOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_POOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case ADD_POOL_ERROR:
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
