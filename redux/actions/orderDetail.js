import api from "../../utils/api";

import {
  FETCH_ORDER_DETAIL_ERROR,
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_SUCCESS,
} from "../types/orderDetail";

export const fetchOrderDetailRequest = () => {
  return {
    type: FETCH_ORDER_DETAIL_REQUEST,
  };
};

export const fetchOrderDetailSuccess = (data) => {
  return {
    type: FETCH_ORDER_DETAIL_SUCCESS,
    payload: data,
  };
};

export const fetchOrderDetailError = (error) => {
  return {
    type: FETCH_ORDER_DETAIL_ERROR,
    payload: error,
  };
};

export const fetchOrderDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchOrderDetailRequest);
    api
      .get("orderDetails/" + id)
      .then((response) => {
        const data = response.data;
        dispatch(fetchOrderDetailSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchOrderDetailError(errorMsg));
      });
  };
};
