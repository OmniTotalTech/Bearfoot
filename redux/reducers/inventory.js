import {
  FETCH_INVENTORY_ERROR,
  FETCH_INVENTORY_REQUEST,
  FETCH_INVENTORY_SUCCESS,
} from "../types/inventory";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };
    case FETCH_INVENTORY_ERROR:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
