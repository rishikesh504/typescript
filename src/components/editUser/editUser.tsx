import React, { useState } from "react"
import { useDispatch ,useSelector} from "react-redux"
import { Button } from "@mui/material"
import { motion } from "framer-motion"
import User from "../../types/userType"
import { addUser } from "../../store/actions/actions"
import StepperForm from "../stepper/stepperMain/stepperForm"
import { RootState } from "../../store/reducer/rootReducer";
import { updateUser } from "../../store/actions/actions"
import styled from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

interface EditUserProps {
        handleEditingState:any
        editUser: User;       
        editingState: boolean;
        handleEditUser:any
      }



const EditUser = ({handleEditingState,editUser,editingState,handleEditUser}:EditUserProps) => {    
   
    

 
    const [user, setUser] = useState<User>(
        {
          id: editUser.id||0,
          personalDetails: {
            name: editUser.personalDetails.name || '',
            email: editUser.personalDetails.email || '',
            gender: editUser.personalDetails.gender || '',
            phone: editUser.personalDetails.phone || '',
            address1:editUser.personalDetails.address1 || '',
            address2:editUser.personalDetails.address2 ||'',
            country: editUser.personalDetails.country ||'',
            state: editUser.personalDetails.state|| '',
            city: editUser.personalDetails.city||'',
            pincode:editUser.personalDetails.pincode|| "",
            dateofbirth:editUser.personalDetails.dateofbirth|| 0
          },
          bankDetails: {
            pan: editUser.bankDetails.pan || '',
            aadhaar:editUser.bankDetails.aadhaar || '',
            bankname:editUser.bankDetails.bankname || '',
            bankaccountnumber:editUser.bankDetails.bankaccountnumber|| '',
            ifsc:editUser.bankDetails.ifsc|| ''
          },
          experienceList: editUser.experienceList,
          educationList:editUser.educationList,
    
        }
    
      );
      
   const [openModel, setOpenModel] = useState(false);
   const dispatch = useDispatch()
 
   
 

  const handleChangeUser = (user:User) => {
         setUser(user)
  }

  const handleSubmit = (user:User) => {
    dispatch(updateUser(user))

    handleEditingState()

    setOpenModel(!openModel)

  }


  const handleOpen = () => {
    handleEditUser()
    handleEditingState()
    setOpenModel(!openModel)
  }


  return (
    <motion.div style={{marginRight:'10px'}}>
      <Button startIcon={<EditIcon/>}  variant='contained' color="primary" onClick={handleOpen} > Edit</Button>
      {openModel && <StepperForm user={user}
      handleChangeUser={handleChangeUser}   handleSubmit={handleSubmit} openModel={openModel} setOpenModel={setOpenModel} editingState={editingState}/>}
    </motion.div>
  )

}


export default EditUser