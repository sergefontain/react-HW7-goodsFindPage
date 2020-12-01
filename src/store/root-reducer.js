import { combineReducers } from "redux";
import goodsReducer from "../screens/goods-search/goodsReducer";
import { authReducer } from "./../services/auth";

export default combineReducers({ auth: authReducer, goods: goodsReducer });
