import api from "../../utils/api";

import {
  FETCH_POOL_ERROR,
  FETCH_POOL_REQUEST,
  FETCH_POOL_SUCCESS,
  FETCH_POOL_BY_ID_SUCCESS,
  FETCH_POOL_BY_ID_ERROR,
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

export const fetchPoolByIdSuccess = (data) => {
  return {
    type: FETCH_POOL_BY_ID_SUCCESS,
    payload: data,
  };
};

export const fetchPoolByIdError = (error) => {
  return {
    type: FETCH_POOL_BY_ID_ERROR,
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

export const fetchPoolById = (id) => {
  return (dispatch) => {
    dispatch(fetchPoolRequest);
    api
      .get("pool/" + id)
      .then((response) => {
        const data = response.data;
        dispatch(fetchPoolByIdSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchPoolByIdError(errorMsg));
      });
  };
};
