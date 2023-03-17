import React, { useState } from "react"
import { useDispatch ,useSelector} from "react-redux"
import { Button } from "@mui/material"
import { motion } from "framer-motion"
import User from "../../types/userType"
import { Add_User } from "../../store/reducer/reducer"
import StepperForm from "../stepper/stepperMain/stepperForm"
import { RootState } from "../../store/userStore/userStore"


const AddUser = () => {    
   const numberOfUsers:User[] = useSelector((state: RootState) => state.users); 
   const maxId = numberOfUsers.length > 0 ? Math.max(...numberOfUsers.map(user => user.id)) : 0;
   const[user, setUser]= useState<User>(
    {
        id : maxId+1,
        personalDetails: {
          name: "",
          email: "",
          gender: "Male",
          phone: "",
          address1: "",
          address2: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          dateofbirth: new Date(),
        },
        bankDetails: {
          pan: "",
          aadhaar: "",
          bankname: "",
          bankaccountnumber: "",
          ifsc: "",
        },
        experienceList: [{ company: "", role: "", from:new Date(), till: new Date() }],
      
        educationList: [{ college: "", percentage: "", stream: "", type: "", from: new Date(), till: new Date() }],
      });
      
   const [openModel, setOpenModel] = useState(false);
   const dispatch = useDispatch()
   const [editingState,setEditingState] = useState(false)
   
   const handleOpen = () => {
    setOpenModel(!openModel)
  }

  const handleChangeUser = (user:User) => {
         setUser(user)
  }

  const handleSubmit = (user:User) => {
      dispatch(Add_User(user))
      setOpenModel(!openModel)
      setUser({
        id : maxId+2,
        personalDetails: {
          name: "",
          email: "",
          gender: "Male",
          phone: "",
          address1: "",
          address2: "",
          country: "",
          state: "",
          city: "",
          pincode: "",
          dateofbirth: new Date(),
        },
        bankDetails: {
          pan: "",
          aadhaar: "",
          bankname: "",
          bankaccountnumber: "",
          ifsc: "",
        },
        experienceList: [{ company: "", role: "", from:new Date(), till: new Date() }],
      
        educationList: [{ college: "", percentage: "", stream: "", type: "", from: new Date(), till: new Date() }],
      })
   }



  return (
    <motion.div animate={{ x: 0 }} initial={{ x: 100 }} transition={{ duration: 1.2 }} style={{ marginBottom: '10px' }}>
      <Button variant="contained" color="primary" onClick={handleOpen} > ADD USER</Button>
      {openModel && <StepperForm user={user} 
        handleChangeUser={handleChangeUser} handleSubmit={handleSubmit} openModel={openModel} setOpenModel={setOpenModel} editingState={editingState} />}
    </motion.div> 
  )

}


export default AddUser