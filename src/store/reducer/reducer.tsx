import User from "../../types/userType";
import { UserAction } from "../../types/actionCreatorType";
import ActionTypes from "../../types/actionType";
import { RootState } from "./rootReducer";



interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case ActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    default:
      return state;
  }
};


// export const usersTotal = (state: RootState) => state.userReducer.users;


