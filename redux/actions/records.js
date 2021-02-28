import api from "../../utils/api";

import {
  FETCH_RECORDS_ERROR,
  FETCH_RECORDS_REQUEST,
  FETCH_RECORDS_SUCCESS,
} from "../types/records";

export const fetchRecordsRequest = () => {
  return {
    type: FETCH_RECORDS_REQUEST,
  };
};

export const fetchRecordsSuccess = (data) => {
  return {
    type: FETCH_RECORDS_SUCCESS,
    payload: data,
  };
};

export const fetchRecordsError = (error) => {
  return {
    type: FETCH_RECORDS_ERROR,
    payload: error,
  };
};

export const fetchRecords = (id, type) => {
  return (dispatch) => {
    dispatch(fetchRecordsRequest);
    api
      .get("/records/search/" + id + "/" + type)
      .then((response) => {
        const data = response.data;
        dispatch(fetchRecordsSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRecordsError(errorMsg));
      });
  };
};
