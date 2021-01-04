import {
  FETCH_ADMIN_EMPLOYEE_BY_ORG_REQUEST,
  FETCH_ADMIN_EMPLOYEE_BY_ORG_SUCCESS,
  FETCH_ADMIN_EMPLOYEE_BY_ORG_ERROR,
} from "../types/adminEmployeeManagement";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_EMPLOYEE_BY_ORG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADMIN_EMPLOYEE_BY_ORG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case FETCH_ADMIN_EMPLOYEE_BY_ORG_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
