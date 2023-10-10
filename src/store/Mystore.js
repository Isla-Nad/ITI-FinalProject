import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import CombineReducer from "./reducers/CombineReducer";

const MyStore = createStore(CombineReducer, composeWithDevTools(applyMiddleware(thunk)));

export default MyStore;
