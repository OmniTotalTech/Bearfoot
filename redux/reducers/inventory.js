import {
  ADD_INVENTORY_ITEM_ERROR,
  ADD_INVENTORY_ITEM_REQUEST,
  ADD_INVENTORY_ITEM_SUCCESS,
  FETCH_INVENTORY_ERROR,
  FETCH_INVENTORY_REQUEST,
  FETCH_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_ITEM_ERROR,
  UPDATE_INVENTORY_ITEM_REQUEST,
  UPDATE_INVENTORY_ITEM_SUCCESS,
} from "../types/inventory";
import { UPDATE_STATUS_ERROR } from "../types/updateStatus";

const initialState = {
  data: {
    inventoryList: [],
  },
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // get inventory //
    case FETCH_INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };
    case FETCH_INVENTORY_ERROR:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };

    // update inventory item //
    case UPDATE_INVENTORY_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
      };
    case UPDATE_INVENTORY_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };

    // add inventory item //
    case ADD_INVENTORY_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_INVENTORY_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case ADD_INVENTORY_ITEM_ERROR:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
