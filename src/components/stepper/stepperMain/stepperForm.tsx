
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import {Box,Stepper,Step,StepLabel} from '@mui/material'
import { motion,AnimatePresence } from "framer-motion";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import EndStep from "../endStep/endStep";
import User from "../../../types/userType";
import BankDetailsForm from "../bankDetails/bankDetails";
import ExperienceForm from "../experience/experience";
import PersonalDetailsForm from "../personalDetails/personalDetails";
import EducationForm from "../education/education";



interface StepperFormProps {
    handleSubmit: (user: User) => void;
    openModel: boolean;
    setOpenModel: (open: boolean) => void;
    user: User;
    editingState: boolean;
    handleChangeUser:(user: User) => void;
  }



const StepperForm = ({ handleSubmit,openModel,setOpenModel,user,editingState,handleChangeUser }:StepperFormProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [proceedNext,setProceedNext] = useState(false)


    const handleProceed = () => {
      setProceedNext(true)
    }

    const steps = ['Personal Details', 'Bank Details', 'Experience', 'Education'];

         const handleClose = () => {
        setOpenModel(false)
      }
      
      const handleUserDetailsChange = (updatedUser:User) => {
        console.log("in parent")
        handleChangeUser(updatedUser)
      };


    // Stepper Functions      

      const handleNext = () => {
        setActiveStep(prevActiveStep=>prevActiveStep+1);
        if( activeStep==3 ){
          handleSubmit(user)
        }
    };


  
    const handleBack = () => {
      setActiveStep(prevActiveStep=>prevActiveStep-1);
   
    };


    
  



    return (
      <div>
        <Dialog open={openModel} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingState ? "Edit User" :"Add User" }</DialogTitle>
        <DialogContent>
        <Box sx={{ width: '100%' , maxHeight:'550px',minHeight:'550px' }}>
     
         <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={index} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
           
        {activeStep === 0 && (
          <PersonalDetailsForm  user={user} onPersonalDetailsChange={handleUserDetailsChange} proceedNext={proceedNext} setProceedNext={setProceedNext}/>
          // <ExperienceForm user={user} onExperienceDetailChange={handleUserDetailsChange} proceedNext={proceedNext} setProceedNext={setProceedNext}/>
        
           )}   
         
          {activeStep === 1 && (
           <BankDetailsForm  user={user} onBankDetailsChange={handleUserDetailsChange} proceedNext={proceedNext} setProceedNext={setProceedNext} />
        )}   
           {activeStep === 2 && (
             <ExperienceForm user={user} onExperienceDetailChange={handleUserDetailsChange} proceedNext={proceedNext} setProceedNext={setProceedNext}/>
            
        )}  
           {activeStep === 3 && (
            <EducationForm user={user} onEducationDetailChange={handleUserDetailsChange} proceedNext={proceedNext} setProceedNext={setProceedNext}/>
        )}  
           {activeStep === 4 && (
           <EndStep></EndStep>
        )}     


        </Box>
     
      
        </DialogContent>
        <Box p={2} sx={{ display: 'flex', flexDirection: 'row', backgroundColor:'transparent',justifyContent:'space-between' }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIosNewIcon/>}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                   
                  >
                    Back
                  </Button>

                {editingState && <Button
                    variant="outlined"
                    startIcon={<SaveIcon/>} 
                    disabled={!proceedNext}  
                onClick={(e)=>handleSubmit(user)} 
                  >Update</Button>}
                
                  <Button endIcon={<NavigateNextIcon/>} variant="contained" disabled={!proceedNext} onClick={handleNext} >
                  {activeStep === 4? "Save" : "Next"}
                  </Button>
                </Box>
      </Dialog>
      </div>
     
    );
  };
  
  export default StepperForm