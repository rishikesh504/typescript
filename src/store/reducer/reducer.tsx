import User from "../../types/userType";
import { UserAction } from "../../types/actionCreatorType";
import ActionTypes from "../../types/actionType";
import { filteredresults } from "../../components/utility/function";





// var nba  =  {
//   "id": 1,
//   "personalDetails": {
//       "name": "dasdasdadasds",
//       "email": "asdsadsad@gmail.com",
//       "gender": "Male",
//       "phone": "8853176201",
//       "address1": "wwe",
//       "address2": "SD",
//       "country": "DSADA",
//       "state": "DADA",
//       "city": "ADADS",
//       "pincode": "226025",
//       "dateofbirth": new Date ()
//   },
//   "bankDetails": {
//       "pan": "DNLPK6410B",
//       "aadhaar": "789034556400",
//       "bankname": "ssSD",
//       "bankaccountnumber": "8888",
//       "ifsc": "ASDASDAD"
//   },
//   "experienceList": [
//       {
//           "company": "www",
//           "role": "www",
//           "from": new Date (),
//           "till": new Date ()
//       }
//   ],
//   "educationList": [
//       {
//           "college": "wwwe",
//           "percentage": "88",
//           "stream": "wwe",
//           "type": "ee",
//           "from": new Date (),
//           "till": new Date () 
//                  }
//   ]
// }


// var wwe = Array.from({ length: 100 }, () => nba);






// interface UserState {
//   users: User[];
// }

// const initialState: UserState = {

//   users: []

  
   
// }
// export const userReducer = (
  
//   state: UserState = initialState,
  
//   action: UserAction
// ): UserState => {


//   switch (action.type) {
//     case ActionTypes.ADD_USER:
//       return {
//         ...state,
//         users: [...state.users, action.payload],
//       };
//     case ActionTypes.DELETE_USER:
//       return {
//         ...state,
//         users: state.users.filter((user) => user.id !== action.payload.id),
//       };
//     case ActionTypes.UPDATE_USER:
//       return {
//         ...state,
//         users: state.users.map((user) =>
//           user.id === action.payload.id ? action.payload : user
//         ),
//       };
//     default:
//       return state;
//   }
// };


// export const usersTotal = (state: RootState) => state.userReducer.users;


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

 interface UserState {
   users: User[];
   filterUsers: User[]
}


const initialState: UserState = {
   users: [],
   filterUsers : []
   
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    Add_User(state, action) {
      state.users.push(action.payload)
    },
    Delete_User(state, action) {
      
      state.users = state.users.filter(user => user.id !== action.payload.id)
      
    },
    Update_User(state, action) {
      state.users = state.users.map((user) =>user.id === action.payload.id ? action.payload : user)
    },
    
    Search_User(state, action) {
      state.filterUsers = filteredresults(action.payload,state.users)
    
    }

  
  },

})

// Action creators are generated for each case reducer function
export const { Add_User,Delete_User,Update_User,Search_User } = usersSlice.actions

export default usersSlice.reducer




