import { combineReducers } from "redux";
import byId from "./byId";
import auth from "./auth";
import orderDetail from "./orderDetail";
import updateStatus from "./updateStatus";
import adminOrderDetail from "./adminOrderDetail";
import pool from "./pool";
import area from "./area";
import adminEmployeeManagement from "./adminEmployeeManagement";
import inventory from "./inventory";
import dailyChecklist from "./dailyChecklist";

export default combineReducers({
  auth: auth,
  // byId: byId,
  orderDetail: orderDetail,
  updateStatus: updateStatus,
  adminOrderDetail: adminOrderDetail,
  pool: pool,
  area: area,
  adminEmployeeManagement: adminEmployeeManagement,
  inventory: inventory,
  dailyChecklist: dailyChecklist,
});
