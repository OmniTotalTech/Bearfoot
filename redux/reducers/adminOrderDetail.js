import {
  FETCH_ADMIN_ORDER_DETAIL_ERROR,
  FETCH_ADMIN_ORDER_DETAIL_REQUEST,
  FETCH_ADMIN_ORDER_DETAIL_SUCCESS,
} from "../types/adminOrderDetail";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADMIN_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case FETCH_ADMIN_ORDER_DETAIL_ERROR:
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
