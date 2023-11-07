import { combineReducers } from "redux";
import currentUserReducer from "./CurrentUserReduser";
import signalReducer from "./SignalReducer";

export default combineReducers({
  user: currentUserReducer,
  signal: signalReducer,
});
