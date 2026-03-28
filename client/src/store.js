import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer, userReducer, usersReducer } from "./reducers";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
});

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhacers(applyMiddleware(thunk)),
);
