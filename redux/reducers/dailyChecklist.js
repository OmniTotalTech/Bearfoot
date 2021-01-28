import {
  FETCH_DAILY_CHECKLIST_ERROR,
  FETCH_DAILY_CHECKLIST_REQUEST,
  FETCH_DAILY_CHECKLIST_SUCCESS,
} from "../types/dailyChecklist";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DAILY_CHECKLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DAILY_CHECKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_DAILY_CHECKLIST_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
