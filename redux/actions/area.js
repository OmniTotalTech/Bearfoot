import api from "../../utils/api";

import {
  FETCH_AREA_ERROR,
  FETCH_AREA_REQUEST,
  FETCH_AREA_SUCCESS,
  FETCH_AREA_POOLS_SUCCESS,
  FETCH_AREA_POOLS_ERROR,
  ADD_AREA_REQUEST,
  ADD_AREA_SUCCESS,
  ADD_AREA_ERROR,
} from "../types/area";

// FETCH AREA //
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

// ADD AREA //
export const addAreaRequest = () => {
  return {
    type: ADD_AREA_REQUEST,
  };
};
export const addAreaSuccess = (data) => {
  return {
    type: ADD_AREA_SUCCESS,
    payload: data,
  };
};
export const addAreaError = (error) => {
  return {
    type: ADD_AREA_ERROR,
    paylaod: error,
  };
};

// FETCH AREA POOL //
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
    console.log("dispatching my areas")
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

export const addArea = () => {
  return (dispatch) => {
    dispatch(addAreaRequest);
    api
      .post("area/")
      .then((response) => {
        console.log(response);
        const data = response.data;
        dispatch(addAreaSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(addAreaError(errorMsg));
      });
  };
};
