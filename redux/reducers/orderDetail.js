import {
  FETCH_ORDER_DETAIL_ERROR,
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_SUCCESS,
} from "../types/orderDetail";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };
    case FETCH_ORDER_DETAIL_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
