import api from "../../utils/api";
import pool from "../reducers/pool";

import {
  FETCH_INVENTORY_REQUEST,
  FETCH_INVENTORY_SUCCESS,
  FETCH_INVENTORY_ERROR,
  ADD_INVENTORY_ITEM_REQUEST,
  ADD_INVENTORY_ITEM_SUCCESS,
  ADD_INVENTORY_ITEM_ERROR,
  UPDATE_INVENTORY_ITEM_REQUEST,
  UPDATE_INVENTORY_ITEM_SUCCESS,
  UPDATE_INVENTORY_ITEM_ERROR,
  UPDATE_INVENTORY_COUNT_REQUEST,
  UPDATE_INVENTORY_COUNT_SUCCESS,
  UPDATE_INVENTORY_COUNT_ERROR,
} from "../types/inventory";

// GET INVENTORY //
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

// UPDATE INVENTORY ITEM //
export const updateInventoryItemRequest = () => {
  return {
    type: UPDATE_INVENTORY_ITEM_REQUEST,
  };
};
export const updateInventoryItemSuccess = (data) => {
  return {
    type: UPDATE_INVENTORY_ITEM_SUCCESS,
    paylaod: data,
  };
};
export const updateInventoryItemError = (error) => {
  return {
    type: UPDATE_INVENTORY_ITEM_ERROR,
    payload: error,
  };
};

// ADD INVENTORY ITEM //
export const addInventoryItemRequest = () => {
  return {
    type: ADD_INVENTORY_ITEM_REQUEST,
  };
};

export const addInventoryItemSuccess = (data) => {
  return {
    type: ADD_INVENTORY_ITEM_SUCCESS,
    payload: data,
  };
};

export const addInventoryItemError = (error) => {
  return {
    type: ADD_INVENTORY_ITEM_ERROR,
    payload: error,
  };
};

// UPDATE INVENTORY COUNT //
export const updateInventoryCountRequest = () => {
  return {
    type: UPDATE_INVENTORY_COUNT_REQUEST,
  };
};
export const updateInventoryCountSuccess = (data) => {
  return {
    type: UPDATE_INVENTORY_COUNT_SUCCESS,
    payload: data,
  };
};
export const updateInventoryCountError = (error) => {
  return {
    type: UPDATE_INVENTORY_COUNT_ERROR,
    payload: error,
  };
};

// GET INVENTORY //
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

// UPDATE INVENTORY ITEM //
export const updateInventoryItem = (id1, id2) => {
  console.log(id1);
  return (dispatch) => {
    dispatch(updateInventoryItemRequest);
    api
      .patch("inventory/" + "item/" + id1 + id2) // most likely have to change, not really sure
      .then((response) => {
        console.log(response);
        const data = response.data;
        dispatch(updateInventoryItemSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateInventoryItemError(errorMsg));
      });
  };
};

// ADD INVENTORY ITEM //
export const addInventoryItem = (poolId, body) => {
  console.log(poolId, body);
  return (dispatch) => {
    dispatch(addInventoryItemRequest);
    api
      .patch("inventory/" + poolId, body)
      .then((response) => {
        console.log(response);
        const data = response.data;
        dispatch(addInventoryItemSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(addInventoryItemError(errorMsg));
      });
  };
};

// UPDATE INVENTORY COUNT //
export const updateInventoryCount = (id, body) => {
  return (dispatch) => {
    dispatch(updateInventoryCountRequest);
    api
      .patch("inventory/" + id, body)
      .then((response) => {
        console.log(response);
        const data = response.data;
        dispatch(updateInventoryCountSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateInventoryCountError(errorMsg));
      });
  };
};
