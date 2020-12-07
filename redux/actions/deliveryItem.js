import api from "../../utils/api";

import {
  FETCH_DELIVERY_ITEM_SUCCESS,
  FETCH_DELIVERY_ITEM_ERROR,
  FETCH_DELIVERY_ITEM_REQUEST,
} from "../types/delivery";

export const fetchDeliveryItemRequest = () => {
  return {
    type: FETCH_DELIVERY_ITEM_REQUEST,
  };
};

export const fetchDeliveryItemSuccess = (data) => {
  return {
    type: FETCH_DELIVERY_ITEM_SUCCESS,
    payload: data,
  };
};

export const fetchDeliveryItemError = (error) => {
  return {
    type: FETCH_DELIVERY_ITEM_ERROR,
    payload: error,
  };
};

export const fetchDeliveryItem = (id) => {
  return (dispatch) => {
    dispatch(fetchDeliveryItemRequest);
    api
      .get("orderDetails/individual/" + id)
      .then((response) => {
        const data = response.data;
        dispatch(fetchDeliveryItemSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchDeliveryItemError(errorMsg));
      });
  };
};
