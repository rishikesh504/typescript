import User from "../../types/userType";
import ActionTypes from "../../types/actionType";
import { UserAction } from "../../types/actionCreatorType";




export const addUser = (user: User): UserAction => ({
    type: ActionTypes.ADD_USER,
    payload: user,
  });
  
  export const deleteUser = (user:User): UserAction => ({
    type: ActionTypes.DELETE_USER,
    payload: user,
  });
  
  export const updateUser = (user: User): UserAction => ({
    type: ActionTypes.UPDATE_USER,
    payload: user,
  });