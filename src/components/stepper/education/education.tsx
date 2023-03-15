import { TextField, Button, Grid, IconButton, Card, Box } from '@mui/material';
import { useEffect } from 'react';
import * as Yup from 'yup';
import User from '../../../types/userType';
import { getIn, useFormik } from 'formik';
import { Delete } from '@mui/icons-material';
import { width } from '@mui/system';
import { on } from 'stream';
import { useCallback } from 'react';
import Education from '../../../types/userEducation';
import { Console } from 'console';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';


interface EducationProps {
    user: User
    onEducationDetailChange: any
    setProceedNext: (open: boolean) => void;
    proceedNext: boolean;
}

interface FormValues {
    educations: Education[];
}



const validationSchema = Yup.object().shape({
    educations: Yup.array().of(
        Yup.object().shape({
            college: Yup.string().required("College is required"),
            stream: Yup.string().required("stream is required"),
            from: Yup.date().required("Joining Date  is required"),
            till: Yup.date().required("Leaving is required"),
            percentage:  Yup.number()
            .typeError('percentage must be a number').required("Percentage is required"),
            type: Yup.string().required("Type is required")
        })
    )
});



const EducationForm = ({
    user,
    onEducationDetailChange,
    proceedNext,
    setProceedNext,
}: EducationProps) => {
    const initialValues: FormValues = {
        educations: user.educationList,
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
        
        },
    });


    useEffect(() => {
    
        if ((formik.errors.educations?.length === 0 || Object.keys(formik.errors).length === 0) && 
            !formik.values.educations.some(obj => Object.values(obj).some(value => value === null || value === ''))) {
          setProceedNext(true);
          onEducationDetailChange({
            ...user,
            educationList: [...formik.values.educations]
          });
        } else {
          setProceedNext(false);
        }
      }, [formik.isValid,formik.values.educations]);


    const { values, touched, errors, handleChange, handleBlur, isValid, handleSubmit, handleReset, setFieldValue } = formik;













    return (
        <form onSubmit={formik.handleSubmit}>

            {formik.values.educations.map((education: Education, index: number) => {
                const college = `educations[${index}].college`;
                const touchedCollege = getIn(touched, college);
                const errorCollege = getIn(errors, college);

                const stream = `educations[${index}].stream`;
                const touchedStream = getIn(touched, stream);
                const errorStream = getIn(errors, stream);


                const percentage = `educations[${index}].percentage`;
                const touchedPercentage = getIn(touched, percentage);
                const errorPercentage= getIn(errors, percentage);


                
                const type = `educations[${index}].type`;
                const touchedType = getIn(touched, type);
                const errorType = getIn(errors, type);


                const from = `educations[${index}].from`;
                const touchedFrom = getIn(touched, from);
                const errorFrom = getIn(errors, from);

                const till = `educations[${index}].till`;
                const touchedTill = getIn(touched, till);
                const errorTill = getIn(errors, till);


                return (
                    <Grid container key={`${index}`}>
                        <Card key={index} sx={{ boxShadow: 1, backgroundColor: 'white', border: 1, borderColor: 'grey.400', borderRadius: '16px', my: 1 }}>
                            <Box p={2}>
                                <span style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}><h2> {education.type || `Education${index + 1}`} </h2>
                                    <DeleteIcon
                                        onClick={() =>
                                            formik.setFieldValue("educations", values.educations.filter((_, i) => i !== index))}

                                        style={{ color: 'red', cursor: 'pointer' }} />
                                </span>
                                <Grid container key={`${index}`}>
                                    <Grid item xs={12} sm={6} marginTop={1} >
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            label="College"
                                            name={college}
                                            value={education.college}
                                            required
                                            helperText={
                                                touchedCollege && errorCollege
                                                    ? errorCollege + ""
                                                    : ""
                                            }
                                            error={Boolean(touchedCollege && errorCollege)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} marginTop={1} marginBottom={2}>
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            label="Percentage"
                                            name={percentage}
                                            value={education.percentage}
                                            required
                                            helperText={
                                                touchedPercentage && errorPercentage
                                                    ? errorPercentage + ""
                                                    : ""
                                            }
                                            error={Boolean(touchedPercentage && errorPercentage)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} marginTop={2} marginBottom={2}>
                                        <div style={{ width: '90%' }}>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                    label="From"
                                                    maxDate={new Date()}
                                                    value={education.from}
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
                                        <div style={{ width: '90%' }}>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DatePicker
                                                    label="Till"
                                                    maxDate={new Date()}
                                                    minDate={education.from}
                                                    value={education.till}
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
                                    <Grid item xs={12} sm={6} marginTop={1} marginBottom={2}>
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            label="Stream"
                                            name={stream}
                                            value={education.stream}
                                            required
                                            helperText={
                                                touchedStream && errorStream
                                                    ? errorStream + ""
                                                    : ""
                                            }
                                            error={Boolean(touchedStream && errorStream)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} marginTop={1} marginBottom={2}>
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            label="Type"
                                            name={type}
                                            value={education.type}
                                            required
                                            helperText={
                                                touchedType && errorType
                                                    ? errorType + ""
                                                    : ""
                                            }
                                            error={Boolean(touchedType && errorType)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                    </Grid>

                                </Grid>
                            </Box>

                        </Card>
                    </Grid>
                )
            })}



            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} >
                <AddCircleOutlineIcon style={{ color: 'blue', cursor: 'pointer', height: '70px' }}
                    onClick={() => {
                        let nullexp = formik.values.educations.find((user: Education) => user.college == '' || user.percentage == '' || user.stream == '' || user.type == '');
                        if (nullexp) {
                            alert("please fill all current education fields then add new one")
                            return;
                        }
                        formik.setFieldValue("educations", [...values.educations, { college: "", percentage: "",from: new Date(), till: new Date(),stream:"",type:"" }])
                    }
                    }
                />
            </div>




        </form>

    )
}


export default EducationForm



