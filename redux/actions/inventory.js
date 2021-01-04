import api from "../../utils/api";

import {
  FETCH_INVENTORY_REQUEST,
  FETCH_INVENTORY_SUCCESS,
  FETCH_INVENTORY_ERROR,
} from "../types/inventory";

export const fetchInventoryRequest = () => {
  return {
    type: FETCH_INVENTORY_REQUEST,
  };
};

export const fetchInventorySuccess = (data) => {
  return {
    type: FETCH_INVENTORY_SUCCESS,
    payload: data,
  };
};

export const fetchInventoryError = (error) => {
  return {
    type: FETCH_INVENTORY_ERROR,
    payload: error,
  };
};

export const fetchInventory = (id) => {
  return (dispatch) => {
    dispatch(fetchInventoryRequest);
    api
      .get("inventory/" + id)
      .then((response) => {
        console.log(response);
        const data = response.data;
        dispatch(fetchInventorySuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchInventoryError(errorMsg));
      });
  };
};
