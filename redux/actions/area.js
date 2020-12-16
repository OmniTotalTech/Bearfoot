import api from "../../utils/api";

import {
  FETCH_AREA_ERROR,
  FETCH_AREA_REQUEST,
  FETCH_AREA_SUCCESS,
} from "../types/area";

export const fetchAreaRequest = () => {
  return {
    type: FETCH_AREA_REQUEST,
  };
};

export const fetchAreaSuccess = (data) => {
  return {
    type: FETCH_AREA_SUCCESS,
    payload: data,
  };
};

export const fetchAreaError = (error) => {
  return {
    type: FETCH_AREA_ERROR,
    payload: error,
  };
};

export const fetchArea = () => {
  return (dispatch) => {
    dispatch(fetchAreaRequest);
    api
      .get("area/")
      .then((response) => {
        const data = response.data;
        dispatch(fetchAreaSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAreaError(errorMsg));
      });
  };
};
