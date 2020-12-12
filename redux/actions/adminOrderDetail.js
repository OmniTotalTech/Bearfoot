import api from "../../utils/api";

import {
  FETCH_ADMIN_ORDER_DETAIL_REQUEST,
  FETCH_ADMIN_ORDER_DETAIL_SUCCESS,
  FETCH_ADMIN_ORDER_DETAIL_ERROR,
} from "../types/adminOrderDetail";

export const fetchAdminOrderDetailRequest = () => {
  return {
    type: FETCH_ADMIN_ORDER_DETAIL_REQUEST,
  };
};

export const fetchAdminOrderDetailSuccess = (data) => {
  return {
    type: FETCH_ADMIN_ORDER_DETAIL_SUCCESS,
    payload: data.foundAdminOrderDetails,
  };
};

export const fetchAdminOrderDetailError = (error) => {
  return {
    type: FETCH_ADMIN_ORDER_DETAIL_ERROR,
    paylaod: error,
  };
};

export const fetchAdminOrderDetail = () => {
  return (dispatch) => {
    dispatch(fetchAdminOrderDetailRequest);
    api
      .get("adminOrderDetails/")
      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch(fetchAdminOrderDetailSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAdminOrderDetailError(errorMsg));
      });
  };
};
