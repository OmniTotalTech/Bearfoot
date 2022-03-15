import api from "../../utils/api";

import {
  FETCH_ADMIN_EMPLOYEE_BY_ORG_REQUEST,
  FETCH_ADMIN_EMPLOYEE_BY_ORG_SUCCESS,
  FETCH_ADMIN_EMPLOYEE_BY_ORG_ERROR,
} from "../types/adminEmployeeManagement";

export const fetchAdminEmployeeByOrgRequest = () => {
  return {
    type: FETCH_ADMIN_EMPLOYEE_BY_ORG_REQUEST,
  };
};

export const fetchAdminEmployeeByOrgSuccess = (data) => {
  return {
    type: FETCH_ADMIN_EMPLOYEE_BY_ORG_SUCCESS,
    payload: data,
  };
};

export const fetchAdminEmployeeByOrgError = (error) => {
  return {
    type: FETCH_ADMIN_EMPLOYEE_BY_ORG_ERROR,
    paylaod: error,
  };
};

export const fetchEmployeesByOrg = (orgName, string) => {
  console.log(orgName,string);
  return (dispatch) => {
    dispatch(fetchAdminEmployeeByOrgRequest);
    if (orgName && string == "all") {
      api
        .get("users/orgEmployees/" + orgName + "/" + string)
        .then((response) => {
          console.log(response);
          const data = response.data;
          dispatch(fetchAdminEmployeeByOrgSuccess(data));
        })
        .catch((error) => {
          const errorMsg = error;
          dispatch(fetchAdminEmployeeByOrgError(errorMsg));
        });
    } else if (string == "HOA") {
      let url = "users/orgEmployees/" + orgName + "/" + "HOA";
      console.log(url);

      api
        .get(url)
        .then((response) => {
          const data = response.data;
          dispatch(fetchAdminEmployeeByOrgSuccess(data));
        })
        .catch((error) => {
          const errorMsg = error;
          dispatch(fetchAdminEmployeeByOrgError(errorMsg));
        });
    } else {
      api
        .get("users/orgEmployees/" + orgName + "/" + string)
        .then((response) => {
          const data = response.data;
          dispatch(fetchAdminEmployeeByOrgSuccess(data));
        })
        .catch((error) => {
          const errorMsg = error;
          dispatch(fetchAdminEmployeeByOrgError(errorMsg));
        });
    }
  };
};
