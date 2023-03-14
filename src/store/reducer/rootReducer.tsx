import { combineReducers } from "redux";
import { userReducer } from "./reducer";

export const rootReducer = combineReducers({
  userReducer: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;