import React from 'react';
import {useEffect} from 'react';
import { useFormik } from 'formik';
import { Button, Grid, Typography,TextField } from '@mui/material';
import * as Yup from 'yup';
import BankDetails from '../../../types/userBankDetails';
import User from '../../../types/userType';




interface BankDetailsProps {
    user: User;
    onBankDetailsChange:any
    setProceedNext: (open: boolean) => void;
    proceedNext:boolean
    
  }
  const panRegex = RegExp(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
)
  const aadhaarRegex = RegExp(
    /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
  )



const validationSchema = Yup.object({
  pan: Yup.string().matches(panRegex, "Invalid Pan").required("PAN is required"),
  aadhaar: Yup.string().matches(aadhaarRegex, "Invalid Aadhaar").required("Aadhaar is required"),
  bankname: Yup.string().required('Bank name is required'),
  bankaccountnumber: Yup.string()
    .required('Bank account number is required')
    .matches(/^\d+$/, 'Bank account number must be a number'),
  ifsc: Yup.string()
    .required('IFSC is required')

});

const BankDetailsForm = ( {onBankDetailsChange,user,proceedNext,setProceedNext }:BankDetailsProps ) => {

    const initialValues: BankDetails = user.bankDetails
    const formik = useFormik<BankDetails>({
    initialValues,
    validationSchema,

    onSubmit: (values) => {
      // Handle form submission here
    }
  });

  useEffect(() => {

    if (Object.keys(formik.errors).length === 0 && !Object.values(formik.values).some(val => val === '')) {
      setProceedNext(true);
      onBankDetailsChange({
        ...user,
        bankDetails:formik.values
    });
    } else {
      setProceedNext(false);
    }
  }, [formik.isValid,formik.values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
   

  };


  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} marginTop={2}>
       
        
        <Grid item xs={12}>
          <TextField
         
            label="Bank Name"
            variant="outlined"
            fullWidth
            name="bankname"
            onBlur={formik.handleBlur} 
            value={formik.values.bankname}
            onChange={handleChange}
            error={formik.touched.bankname && Boolean(formik.errors.bankname)}
            helperText={formik.touched.bankname && formik.errors.bankname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
       
            label="Bank Account Number"
            variant="outlined"
            fullWidth
            name="bankaccountnumber"
            onBlur={formik.handleBlur} 
            value={formik.values.bankaccountnumber}
            onChange={handleChange}
            error={
              formik.touched.bankaccountnumber &&
              Boolean(formik.errors.bankaccountnumber)
            }
            helperText={
              formik.touched.bankaccountnumber && formik.errors.bankaccountnumber
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="IFSC"
            variant="outlined"
            fullWidth
            name="ifsc"
            onBlur={formik.handleBlur} 
            value={formik.values.ifsc}
            onChange={handleChange}
            error={
              formik.touched.ifsc &&
              Boolean(formik.errors.ifsc)
            }
            helperText={
              formik.touched.ifsc && formik.errors.ifsc
            }
              />
              </Grid>
              <Grid item xs={12} sm={6}>
          <TextField
           
            label="PAN"
            variant="outlined"
            fullWidth
            name="pan" 
            value={formik.values.pan}
            onBlur={formik.handleBlur} 
            onChange={handleChange}
            error={formik.touched.pan && Boolean(formik.errors.pan)}
            helperText={formik.touched.pan && formik.errors.pan}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Aadhaar"
            variant="outlined"
            fullWidth
            name="aadhaar"
            onBlur={formik.handleBlur} 
            value={formik.values.aadhaar}
            onChange={handleChange}
            error={formik.touched.aadhaar && Boolean(formik.errors.aadhaar)}
            helperText={formik.touched.aadhaar && formik.errors.aadhaar}
          />
        </Grid>
   
  </Grid>
</form>
);
};

export default BankDetailsForm;
