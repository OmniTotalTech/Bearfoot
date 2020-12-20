import api from "../../utils/api";

import {
  FETCH_AREA_ERROR,
  FETCH_AREA_REQUEST,
  FETCH_AREA_SUCCESS,
  FETCH_AREA_POOLS_SUCCESS,
  FETCH_AREA_POOLS_ERROR,
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
export const fetchAreaPoolsSuccess = (data) => {
  return {
    type: FETCH_AREA_POOLS_SUCCESS,
    payload: data,
  };
};

export const fetchAreaPoolsError = (error) => {
  return {
    type: FETCH_AREA_POOLS_ERROR,
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

export const fetchMyAdminAreas = () => {
  return (dispatch) => {
    dispatch(fetchAreaRequest);
    api
      .get("area/myAreas")
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

export const fetchAreaPools = (id) => {
  return (dispatch) => {
    dispatch(fetchAreaRequest);
    api
      .get("area/pools/" + id)
      .then((response) => {
        console.log("hit", response.data);
        const data = response.data.foundPools;
        dispatch(fetchAreaPoolsSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message.foundPools;
        dispatch(fetchAreaPoolsError(errorMsg));
      });
  };
};
