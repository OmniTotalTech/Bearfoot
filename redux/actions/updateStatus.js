import api from "../../utils/api";

import {
  UPDATE_STATUS_ERROR,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
} from "../types/updateStatus";

export const updateStatusRequest = () => {
  return {
    type: UPDATE_STATUS_REQUEST,
  };
};

export const updateStatusSuccess = (data) => {
  return {
    type: UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

export const updateStatusError = (error) => {
  return {
    type: UPDATE_STATUS_ERROR,
    payload: error,
  };
};

export const updateStatus = (id, body) => {
  console.log(body);
  return (dispatch) => {
    dispatch(updateStatusRequest);
    api
      .request({
        method: "PATCH",
        url: "orderDetails/" + id,
        data: body,
      })
      .then((response) => {
        const data = response.data;
        dispatch(updateStatusSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateStatusError(errorMsg));
      });
  };
};
