import api from "../../utils/api";

import {
  FETCH_BY_ID_ERROR,
  FETCH_BY_ID_REQUEST,
  FETCH_BY_ID_SUCCESS,
} from "../types/byId";

export const fetchByIdRequest = () => {
  return {
    type: FETCH_BY_ID_REQUEST,
  };
};

export const fetchByIdSuccess = (data) => {
  return {
    type: FETCH_BY_ID_SUCCESS,
    payload: data,
  };
};

export const fetchByIdError = (error) => {
  return {
    type: FETCH_BY_ID_ERROR,
    payload: error,
  };
};

export const fetchAll = () => {
  return (dispatch) => {
    dispatch(fetchByIdRequest);
    api
      .get("hoa/")
      .then((response) => {
        const data = response.data;
        dispatch(fetchByIdSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchByIdError(errorMsg));
      });
  };
};
