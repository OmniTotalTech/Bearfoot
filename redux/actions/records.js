import api from "../../utils/api";

import {
  FETCH_RECORDS_ERROR,
  FETCH_RECORDS_REQUEST,
  FETCH_RECORDS_SUCCESS,
  FETCH_SENSITIVE_RECORDS_SUCCESS,
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

export const fetchSensitiveRecordsSuccess = (data) => {
  return {
    type: FETCH_SENSITIVE_RECORDS_SUCCESS,
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

export const fetchSensitiveRecords = () => {
  return (dispatch) => {
    dispatch(fetchRecordsRequest);
    api
      .get("/records/sensitive/all")
      .then((response) => {
        console.log(response);
        const data = response.data;
        dispatch(fetchSensitiveRecordsSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRecordsError(errorMsg));
      });
  };
};
