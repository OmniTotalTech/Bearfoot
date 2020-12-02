import {
  UPDATE_STATUS_ERROR,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
} from "../types/updateStatus";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };
    case UPDATE_STATUS_ERROR:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
