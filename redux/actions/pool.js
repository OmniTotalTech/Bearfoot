import api from "../../utils/api";

import {
  FETCH_POOL_ERROR,
  FETCH_POOL_REQUEST,
  FETCH_POOL_SUCCESS,
} from "../types/pool";

export const fetchPoolRequest = () => {
  return {
    type: FETCH_POOL_REQUEST,
  };
};

export const fetchPoolSuccess = (data) => {
  return {
    type: FETCH_POOL_SUCCESS,
    payload: data,
  };
};

export const fetchPoolError = (error) => {
  return {
    type: FETCH_POOL_ERROR,
    payload: error,
  };
};

export const fetchPool = () => {
  return (dispatch) => {
    dispatch(fetchPoolRequest);
    api
      .get("pool/")
      .then((response) => {
        const data = response.data;
        dispatch(fetchPoolSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchPoolError(errorMsg));
      });
  };
};
