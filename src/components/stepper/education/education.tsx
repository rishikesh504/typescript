import { TextField, Button, Grid, IconButton, Card, Box } from '@mui/material';
import { useEffect } from 'react';
import * as Yup from 'yup';
import User from '../../../types/userType';
import { useFormik } from 'formik';
import { Delete } from '@mui/icons-material';
import { width } from '@mui/system';
import { on } from 'stream';
import { useCallback } from 'react';
import { Console } from 'console';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import Education from '../../../types/userEducation';

interface EducationProps {
    user: User
    onEducationDetailChange: any
    setProceedNext: (open: boolean) => void;
    proceedNext: boolean;
}

interface FormValues {
    educations: Education[];
}

const experienceSchema = Yup.object().shape({
    company: Yup.string().required("Company is required"),
    role: Yup.string().required(),
    from: Yup.number().required(),
    stream: Yup.number().required(),
    till: Yup.number().required(),
    type: Yup.string().required(),
});

const validationSchema = Yup.array().of(experienceSchema);





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
        // validateOnMount: true,
        onSubmit: (values) => {
            console.log(values);
        },
    });






    const addEducations= () => {
        var nullexp = formik.values.educations.find((user: Education) => user.college == '' || user.percentage == '');
        if (nullexp) {
            alert("please fill all current education fields then add new one")
            return;
        }
        formik.setFieldValue('educations', [...formik.values.educations, { college: '', percentage: 0, from: new Date(), till: new Date(), type:'',stream:''  }]);
        onEducationDetailChange({
            ...user,
            educationList: [...user.educationList, { college: '', percentage: 0, from: new Date(), till: new Date(), type:'',stream:''  }],
        });


    };


    const handleInputChange = useCallback((name: string, value: any, index: number) => {
        const educations = [...formik.values.educations];
        console.log(educations)
        educations[index] = { ...educations[index], [name]: name === 'from' || name === 'till' ? new Date(value) : value };
        formik.setFieldValue('educations', educations);
        onEducationDetailChange({
            ...user,
            educationList: [...educations]

        })
        console.log(formik.errors)

    }, [formik.values.educations, onEducationDetailChange, user]);



    const removeEducations = (index: number) => {
        const educations = [...formik.values.educations];
        educations.splice(index, 1);
        formik.setFieldValue('educations', educations);
        onEducationDetailChange({
            ...user,
            experienceList: [...educations],
        });
    };



    // const handleFromDateChange = (index, date) => {
    //     const list = [...experienceListState];
    //     const formattedDate = new Date(date).toLocaleDateString('en-GB');
    //     list[index] = { ...list[index], from: formattedDate };
    //     setExperienceListState(list);

    //     onExperienceDetailsChange({
    //       ...user,
    //       experienceList: [...list]
    //     });
    //   };

    //   const handleTillDateChange = (index, date) => {
    //     const list = [...experienceListState];
    //     const formattedDate = new Date(date).toLocaleDateString('en-GB');
    //     list[index] = { ...list[index], till: formattedDate };
    //     setExperienceListState(list);

    //     onExperienceDetailsChange({
    //       ...user,
    //       experienceList: [...list]
    //     });
    //   };

    return (
        <form onSubmit={formik.handleSubmit}>

            <Grid container spacing={2} marginTop={2}>

                {formik.values.educations.map((education: Education, index: number) => (
                    <Card key={index} sx={{ boxShadow: 1, backgroundColor: 'white', border: 1, borderColor: 'grey.400', borderRadius: '16px', my: 1 }}>
                        <Box p={2}>
                            <span style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}><h2> {education.type || `education${index + 1}`} </h2>
                                <DeleteIcon onClick={() => removeEducations(index)} style={{ color: 'red', cursor: 'pointer' }} />
                            </span>
                            <Grid container key={`${index}`}>
                                <Grid item xs={12} sm={6} marginTop={1} >
                                    <TextField
                                        name={`educations[${index}].colllege`}
                                        label="College"
                                        value={education.college}
                                        onChange={(e) => handleInputChange('college', e.target.value, index)}
                                        onBlur={formik.handleBlur}
                                        // error={!!(formik.errors.educations && formik.touched.educations && formik.touched.educations[index] && formik.errors.educations[index] as education && (formik.errors.educations[index] as education).company)}
                                        // helperText={(formik.errors.educations && formik.touched.educations) && (formik.touched.educations[index])?.company && (formik.errors.educations[index] as education)?.company}
                                    />


                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={1} marginBottom={2}>
                                    <TextField
                                        name={`educations[${index}].percentage`}
                                        label="Percentage"
                                        value={education.percentage}
                                        onChange={(e) => handleInputChange('percentage', e.target.value, index)}
                                        onBlur={formik.handleBlur}
                                        // error={formik.touched.educations?.[index]?.role && Boolean(formik.errors.educations?.[index]?.role)}
                                        // helperText={formik.touched.educations?.[index]?.role && formik.errors.educations?.[index]?.role}
                                    />


                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={2} marginBottom={2}>
                                <div style={{width:'88%'}}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                           label="FROM"
                                           maxDate={new Date()}
                                           value={new Date(education.from).toLocaleDateString('en-US')}
                                           inputFormat="DD-MM-YYYY"
                                            onChange={(date: Date|null) => handleInputChange("from",date,index)}
                                        
                                            renderInput={(params: any) => <TextField {...params} name={`educations[${index}].from`} onBlur={formik.handleBlur}

                                            />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={2}>
                                <div style={{width:'88%'}}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                           label="Till"
                                           maxDate={new Date()}
                                           minDate={moment(new Date(education.from).toLocaleDateString('en-US')).toDate()}
                                           value={new Date(education.till).toLocaleDateString('en-US')}
                                           inputFormat="DD-MM-YYYY"
                                           onChange={(date: Date|null) => handleInputChange("till",date,index)}
                                        
                                            renderInput={(params: any) => <TextField {...params} name={`educations[${index}].from`} onBlur={formik.handleBlur}

                                            />}
                                        />
                                    </LocalizationProvider>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={1} >
                                    <TextField
                                        name={`educations[${index}].stream`}
                                        label="Stream"
                                        value={education.stream}
                                        onChange={(e) => handleInputChange('stream', e.target.value, index)}
                                        onBlur={formik.handleBlur}
                                        // error={!!(formik.errors.educations && formik.touched.educations && formik.touched.educations[index] && formik.errors.educations[index] as education && (formik.errors.educations[index] as education).company)}
                                        // helperText={(formik.errors.educations && formik.touched.educations) && (formik.touched.educations[index])?.company && (formik.errors.educations[index] as education)?.company}
                                    />


                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={1} marginBottom={2}>
                                    <TextField
                                        name={`educations[${index}].type`}
                                        label="Type"
                                        value={education.type}
                                        onChange={(e) => handleInputChange('type', e.target.value, index)}
                                        onBlur={formik.handleBlur}
                                        // error={formik.touched.educations?.[index]?.role && Boolean(formik.errors.educations?.[index]?.role)}
                                        // helperText={formik.touched.educations?.[index]?.role && formik.errors.educations?.[index]?.role}
                                    />


                                </Grid>


                            </Grid>
                        </Box>
                    </Card>
                ))}

                {/* <Grid item xs={12}>
                    <Button type="button" >
                        Add education
                    </Button>
                </Grid> */}

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} >
                    <AddCircleOutlineIcon style={{ color: 'blue', cursor: 'pointer', height: '35px' }} onClick={() => addEducations()} />
                </div>
            </Grid>



        </form>

    )
}


export default EducationForm



