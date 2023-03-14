import React from 'react';
import { useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import { Button, Grid, Typography, TextField, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import User from '../../../types/userType';
import PersonalDetails from '../../../types/userPersonalDetail';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';



interface PersonalDetailsProps {
    user: User;
    onPersonalDetailsChange: any
    setProceedNext: (open: boolean) => void;
    proceedNext: boolean

}

const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

const pincodeRegex = RegExp(
    /^(\d{4}|\d{6})$/
)

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required"),
    address1: Yup.string().required("Address line 1 is required"),
    address2: Yup.string().required("Address2 is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string().matches(pincodeRegex, "Invalid pincode").required("Pincode is required"),
    dateofbirth: Yup.date()
        .min(
            new Date(new Date().getFullYear() - 58, 0, 1),
            "You must be less than 58 years old"
        )
        .max(
            new Date(new Date().getFullYear() - 18, 11, 31),
            "You must be at least 18 years old"
        )
        .required("Date of birth is required"),
});

const PersonalDetailsForm = ({ onPersonalDetailsChange, user, proceedNext, setProceedNext }: PersonalDetailsProps) => {
    const initialValues: PersonalDetails = user.personalDetails
    const formik = useFormik<PersonalDetails>({
        initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            // Handle form submission here
        }
    });

    useEffect(() => {
        console.log("here1")
        console.log(formik.errors)
        setProceedNext(formik.isValid)
    }, [formik.isValid]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);
        onPersonalDetailsChange({
            ...user,
            personalDetails: {
                ...user.personalDetails,
                [event.target.name]: event.target.value
            }
        });

    };
    const handleDateOfBirthChange = (date: Date | null) => {
        formik.setFieldValue("dateofbirth", date); // use correct field name
        onPersonalDetailsChange({
            ...user,
            personalDetails: {
                ...user.personalDetails,
                ["dateofbirth"]: date // use correct field name
            }
        });
    };


    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} marginTop={2}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        onBlur={formik.handleBlur}// add name attribute for formik to track this field
                        value={formik.values.name}
                        // add value attribute to reflect formik values
                        onChange={handleChange} // use handleChange function for onChange event
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        onChange={handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField

                        label="Phone"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        onChange={handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        label="GENDER"
                        variant="outlined"
                        fullWidth
                        name="gender"
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        name="country"
                        onBlur={formik.handleBlur}
                        value={formik.values.country}
                        onChange={handleChange}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* <TextField
                        label="Date of Birth"
                        variant="outlined"
                        fullWidth
                        name="dateofbirth"
                        onBlur={formik.handleBlur}
                        value={formik.values.dateofbirth}
                        onChange={handleChange}
                        error={formik.touched.dateofbirth && Boolean(formik.errors.dateofbirth)}
                        // helperText={formik.touched.dateofbirth && formik.errors.dateofbirth}
                    /> */}
                    <div style={{ width: '100%' }}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    label="Date of birth"
                                    inputFormat="DD/MM/YYYY"
                                    value={formik.values.dateofbirth} // use correct field name
                                    onChange={handleDateOfBirthChange}
                                   
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                
                                            onBlur={formik.handleBlur}
                                            name="dateofbirth" // use correct field name
                                            error={formik.touched.dateofbirth && Boolean(formik.errors.dateofbirth)}
                                            helperText={formik.errors.dateofbirth ? formik.errors.dateofbirth+"":''}
                                            
                                        />
                                    )}
                                />
                            </LocalizationProvider>

                        </LocalizationProvider>
            
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        variant="outlined"
                        fullWidth
                        name="state"
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                        onChange={handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        name="city"
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        onChange={handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Address 2"
                        variant="outlined"
                        fullWidth
                        name="address2"
                        onBlur={formik.handleBlur}
                        value={formik.values.address2}
                        onChange={handleChange}
                        error={formik.touched.address2 && Boolean(formik.errors.address2)}
                        helperText={formik.touched.address2 && formik.errors.address2}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Pincode"
                        variant="outlined"
                        fullWidth
                        name="pincode"
                        onBlur={formik.handleBlur}
                        value={formik.values.pincode}
                        onChange={handleChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={formik.touched.pincode && formik.errors.pincode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Address 1"
                        variant="outlined"
                        fullWidth
                        name="address1"
                        onBlur={formik.handleBlur}
                        value={formik.values.address1}
                        onChange={handleChange}
                        error={formik.touched.address1 && Boolean(formik.errors.address1)}
                        helperText={formik.touched.address1 && formik.errors.address1}
                    />
                </Grid>

                {/* <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={formik.isSubmitting}
      >
        Submit
      </Button>
    </Grid> */}
            </Grid>
        </form>
    );
};

export default PersonalDetailsForm;
