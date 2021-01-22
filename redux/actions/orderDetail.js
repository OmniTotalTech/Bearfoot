import api from "../../utils/api";

import {
  FETCH_ORDER_DETAIL_ERROR,
  FETCH_ORDER_DETAIL_REQUEST,
  FETCH_ORDER_DETAIL_SUCCESS,
  FETCH_INDIVIDUAL_ORDER_DETAIL_ERROR,
  FETCH_INDIVIDUAL_ORDER_DETAIL_SUCCESS,
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

export const fetchIndividualOrderDetailSuccess = (data) => {
  return {
    type: FETCH_INDIVIDUAL_ORDER_DETAIL_SUCCESS,
    payload: data,
  };
};

export const fetchIndividualOrderDetailError = (error) => {
  return {
    type: FETCH_INDIVIDUAL_ORDER_DETAIL_ERROR,
    payload: error,
  };
};

export const fetchOrderDetail = () => {
  return (dispatch) => {
    dispatch(fetchOrderDetailRequest);
    api
      .get("orderDetails/")
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

export const fetchIndividualOrderDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchOrderDetailRequest);
    api
      .get("orderDetails/individual/" + id)
      .then((response) => {
        const data = response.data;
        dispatch(fetchIndividualOrderDetailSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchIndividualOrderDetailError(errorMsg));
      });
  };
};
