import { TextField, Button, Grid, IconButton, Card, Box } from '@mui/material';
import { useEffect } from 'react';
import * as Yup from 'yup';
import User from '../../../types/userType';
import { getIn, useFormik } from 'formik';
import { Delete } from '@mui/icons-material';
import { width } from '@mui/system';
import { on } from 'stream';
import { useCallback } from 'react';
import Experience from '../../../types/userExperience';
import { Console } from 'console';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';


interface ExperienceProps {
    user: User
    onExperienceDetailChange: any
    setProceedNext: (open: boolean) => void;
    proceedNext: boolean;
}

interface FormValues {
    experiences: Experience[];
}



const validationSchema = Yup.object().shape({
    experiences: Yup.array().of(
        Yup.object().shape({
            company: Yup.string().required("Company is required"),
            role: Yup.string().required("role is required"),
            from: Yup.date().required("Joining Date  is required"),
            till: Yup.date().required("Leaving is required")
        })
    )
});



const ExperienceForm = ({
    user,
    onExperienceDetailChange,
    proceedNext,
    setProceedNext,
}: ExperienceProps) => {
    const initialValues: FormValues = {
        experiences: user.experienceList,
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
       
        },
    });


    useEffect(() => {
        
        if ((formik.errors.experiences?.length === 0 || Object.keys(formik.errors).length === 0) && 
            !formik.values.experiences.some(obj => Object.values(obj).some(value => value === null || value === ''))) {
          setProceedNext(true);
          onExperienceDetailChange({
            ...user,
            experienceList: [...formik.values.experiences]
          });
        } else {
          setProceedNext(false);
        }
      }, [formik.isValid,formik.values.experiences]);


    const { values, touched, errors, handleChange, handleBlur, isValid, handleSubmit, handleReset, setFieldValue } = formik;













    return (
        <form onSubmit={formik.handleSubmit}>

            {formik.values.experiences.map((experience: Experience, index: number) => {
                const company = `experiences[${index}].company`;
                const touchedCompany = getIn(touched, company);
                const errorCompany = getIn(errors, company);

                const role = `experiences[${index}].role`;
       
                const touchedRole = getIn(touched, role);
                const errorRole = getIn(errors, role);

                const from = `experiences[${index}].from`;
                const touchedFrom = getIn(touched, from);
                const errorFrom = getIn(errors, from);

                const till = `experiences[${index}].till`;
                const touchedTill = getIn(touched, till);
                const errorTill = getIn(errors, till);


                return (
                    <Grid container key={`${index}`}>
                        <Card key={index} sx={{ boxShadow: 1, backgroundColor: 'white', border: 1, borderColor: 'grey.400', borderRadius: '16px', my: 1 }}>
                            <Box p={2}>
                                <span style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}><h2> {experience.role || `Experience ${index + 1}`} </h2>
                                    <DeleteIcon
                                        onClick={() =>
                                            formik.setFieldValue("experiences", values.experiences.filter((_, i) => i !== index))}

                                        style={{ color: 'red', cursor: 'pointer' }} />
                                </span>
                                <Grid container key={`${index}`}>
                                    <Grid item xs={12} sm={6} marginTop={1} >
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            label="Company"
                                            name={company}
                                            value={experience.company}
                                            required
                                            helperText={
                                                touchedCompany && errorCompany
                                                    ? errorCompany
                                                    : ""
                                            }
                                            error={Boolean(touchedCompany && errorCompany)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} marginTop={1} marginBottom={2}>
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            label="Role"
                                            name={role}
                                            value={experience.role}
                                            required
                                            helperText={
                                               touchedRole && errorRole 
                                                    ? errorRole
                                                    : ""
                                            }
                                              error={Boolean(touchedRole && errorRole) }
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} marginTop={2} marginBottom={2}>
                                        <div style={{ width: '93%' }}>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                    label="From"
                                                    maxDate={new Date()}
                                                    value={experience.from}
                                                    inputFormat="DD/MM/YYYY"
                                                    onChange={date => setFieldValue(from, date)}

                                                    renderInput={(params: any) => <TextField {...params}
                                                        helperText={
                                                            touchedFrom && errorFrom
                                                                ? errorFrom + ""
                                                                : ""
                                                        }
                                                        error={Boolean(touchedFrom && errorFrom)}
                                                        onBlur={handleBlur}

                                                    />
                                                    }
                                                />




                                            </LocalizationProvider>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} marginTop={2} marginBottom={2}>
                                        <div style={{ width: '93%' }}>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                    label="Till"
                                                    maxDate={new Date()}
                                                    minDate={experience.from}
                                                    value={experience.till}
                                                    inputFormat="DD/MM/YYYY"
                                                    onChange={date => setFieldValue(till, date)}

                                                    renderInput={(params: any) => <TextField {...params}
                                                        helperText={
                                                            touchedTill && errorTill
                                                                ? errorTill + ""
                                                                : ""
                                                        }
                                                        error={Boolean(touchedTill && errorTill)}
                                                        onBlur={handleBlur}

                                                    />
                                                    }
                                                />




                                            </LocalizationProvider>
                                        </div>
                                    </Grid>


                                </Grid>
                            </Box>

                        </Card>
                    </Grid>
                )
            }).reverse()}



            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} >
                <AddCircleOutlineIcon style={{ color: 'blue', cursor: 'pointer', height: '70px' }}
                    onClick={() => {
                        let nullexp = formik.values.experiences.find((user: Experience) => user.company == '' || user.role == '');
                        if (nullexp) {
                            alert("please fill all current experience fields then add new one")
                            return;
                        }
                        formik.setFieldValue("experiences", [...values.experiences, { company: "", role: "",from: new Date(), till: new Date() }])
                    }
                    }
                />
            </div>




        </form>

    )
}


export default ExperienceForm



