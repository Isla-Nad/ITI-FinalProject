import { combineReducers } from "redux";
import currentUserReducer from "./CurrentUserReduser";

export default combineReducers({
  user: currentUserReducer,
});
