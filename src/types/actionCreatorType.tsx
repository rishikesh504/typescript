import User from "./userType";
import ActionTypes from "./actionType";


  
  // Action creators
  interface AddUserAction {
    type: ActionTypes.ADD_USER;
    payload: User;
  }
  
  interface DeleteUserAction {
    type: ActionTypes.DELETE_USER;
    payload: User; // User ID
  }
  
  interface UpdateUserAction {
    type: ActionTypes.UPDATE_USER;
    payload: User;
  }
  
  export type UserAction = AddUserAction | DeleteUserAction | UpdateUserAction;