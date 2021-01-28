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
    paylaod: data,
  };
};

export const fetchDailyChecklistError = (error) => {
  return {
    type: FETCH_DAILY_CHECKLIST_ERROR,
    payload: error,
  };
};

export const dailyChecklist = () => {
  return (dispatch) => {
    dispatch(fetchDailyChecklistRequest);
    api
      .get("dailyChecklist/")
      .then((response) => {
        const data = response.data;
        dispatch(fetchDailyChecklistSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchDailyChecklistError(errorMsg));
      });
  };
};
