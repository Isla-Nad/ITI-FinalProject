import { combineReducers } from "redux";
import currentUserReducer from "./CurrentUserReduser";
import signalReducer from "./SignalReducer";
import searchQueryReducer from "./SearchQueryReducer";
import changeLangReduser from "./ChangeLangReduser";

export default combineReducers({
  user: currentUserReducer,
  signal: signalReducer,
  search: searchQueryReducer,
  lang: changeLangReduser,
});
