import {
  FETCH_INDIVIDUAL_ORDER_DETAIL_ERROR,
  FETCH_INDIVIDUAL_ORDER_DETAIL_SUCCESS,
  FETCH_ORDER_DETAIL_ERROR,
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_SUCCESS,
} from "../types/orderDetail";

const initialState = {
  data: {
    primary: [],
    secondary: [],
  },
  loading: false,
  error: null,
  individualOrderDetail: {},
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
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case FETCH_INDIVIDUAL_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        individualOrderDetail: action.payload,
        error: null,
      };
    case FETCH_INDIVIDUAL_ORDER_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        individualOrderDetail: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
