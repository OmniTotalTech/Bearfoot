import api from "../../utils/api";

import {
  FETCH_DAILY_CHECKLIST_ERROR,
  FETCH_DAILY_CHECKLIST_REQUEST,
  FETCH_DAILY_CHECKLIST_SUCCESS,
} from "../types/dailyChecklist";

export const fetchDailyChecklistRequest = () => {
  return {
    type: FETCH_DAILY_CHECKLIST_REQUEST,
  };
};

export const fetchDailyChecklistSuccess = (data) => {
  return {
    type: FETCH_DAILY_CHECKLIST_SUCCESS,
    payload: data,
  };
};

export const fetchDailyChecklistError = (error) => {
  return {
    type: FETCH_DAILY_CHECKLIST_ERROR,
    payload: error,
  };
};

export const fetchDailyChecklist = (id, type) => {
  return (dispatch) => {
    dispatch(fetchDailyChecklistRequest);
    api
      .get("/dailyChecklist/" + id + "/" + type)
      .then((response) => {
<<<<<<< HEAD
        console.log(response.data)
=======
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        const data = response.data;
        dispatch(fetchDailyChecklistSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchDailyChecklistError(errorMsg));
      });
  };
};
