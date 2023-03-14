import { TextField, Button, Grid, IconButton, Card, Box } from '@mui/material';
import { useEffect } from 'react';
import * as Yup from 'yup';
import User from '../../../types/userType';
import { useFormik } from 'formik';
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

const experienceSchema = Yup.object().shape({
    company: Yup.string().required("Company is required"),
    role: Yup.string().required(),
    from: Yup.number().required(),
    till: Yup.number().required(),
});

const validationSchema = Yup.array().of(experienceSchema);





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
        // validateOnMount: true,
        onSubmit: (values) => {
            console.log(values);
        },
    });






    const addExperience = () => {
        var nullexp = formik.values.experiences.find((user: Experience) => user.company == '' || user.role == '');
        if (nullexp) {
            alert("please fill all current experience fields then add new one")
            return;
        }
        formik.setFieldValue('experiences', [...formik.values.experiences, { company: '', role: '', from: new Date(), till: new Date}]);
        onExperienceDetailChange({
            ...user,
            experienceList: [...user.experienceList, { company: '', role: '', from: new Date(), till: new Date() }],
        });


    };


    const handleInputChange = useCallback((name: string, value: any, index: number) => {
        const experiences = [...formik.values.experiences];
        console.log(experiences)
        experiences[index] = { ...experiences[index], [name]: name === 'from' || name === 'till' ? new Date(value) : value };
        formik.setFieldValue('experiences', experiences);
        onExperienceDetailChange({
            ...user,
            experienceList: [...experiences]

        })
        console.log(formik.errors)

    }, [formik.values.experiences, onExperienceDetailChange, user]);



    const removeExperience = (index: number) => {
        const experiences = [...formik.values.experiences];
        experiences.splice(index, 1);
        formik.setFieldValue('experiences', experiences);
        onExperienceDetailChange({
            ...user,
            experienceList: [...experiences],
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

                {formik.values.experiences.map((experience: Experience, index: number) => (
                    <Card key={index} sx={{ boxShadow: 1, backgroundColor: 'white', border: 1, borderColor: 'grey.400', borderRadius: '16px', my: 1 }}>
                        <Box p={2}>
                            <span style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}><h2> {experience.role || `Experience${index + 1}`} </h2>
                                <DeleteIcon onClick={() => removeExperience(index)} style={{ color: 'red', cursor: 'pointer' }} />
                            </span>
                            <Grid container key={`${index}`}>
                                <Grid item xs={12} sm={6} marginTop={1} >
                                    <TextField
                                        name={`experiences[${index}].company`}
                                        label="Company"
                                        value={experience.company}
                                        onChange={(e) => handleInputChange('company', e.target.value, index)}
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.errors.experiences && formik.touched.experiences && formik.touched.experiences[index] && formik.errors.experiences[index] as Experience && (formik.errors.experiences[index] as Experience).company)}
                                        helperText={(formik.errors.experiences && formik.touched.experiences) && (formik.touched.experiences[index])?.company && (formik.errors.experiences[index] as Experience)?.company}
                                    />


                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={1} marginBottom={2}>
                                    <TextField
                                        name={`experiences[${index}].role`}
                                        label="Role"
                                        value={experience.role}
                                        onChange={(e) => handleInputChange('role', e.target.value, index)}
                                        onBlur={formik.handleBlur}
                                        // error={formik.touched.experiences?.[index]?.role && Boolean(formik.errors.experiences?.[index]?.role)}
                                        // helperText={formik.touched.experiences?.[index]?.role && formik.errors.experiences?.[index]?.role}
                                    />


                                </Grid>
                                <Grid item xs={12} sm={6} marginTop={2} marginBottom={2}>
                                <div style={{width:'88%'}}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                           label="FROM"
                                           maxDate={new Date()}
                                           value={new Date(experience.from).toLocaleDateString('en-US')}
                                           inputFormat="DD-MM-YYYY"
                                            onChange={(date: Date|null) => handleInputChange("from",date,index)}
                                        
                                            renderInput={(params: any) => <TextField {...params} name={`experiences[${index}].from`} onBlur={formik.handleBlur}

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
                                           minDate={moment(new Date(experience.from).toLocaleDateString('en-US')).toDate()}
                                           value={new Date(experience.till).toLocaleDateString('en-US')}
                                           inputFormat="DD-MM-YYYY"
                                           onChange={(date: Date|null) => handleInputChange("till",date,index)}
                                        
                                            renderInput={(params: any) => <TextField {...params} name={`experiences[${index}].from`} onBlur={formik.handleBlur}

                                            />}
                                        />
                                    </LocalizationProvider>
                                    </div>
                                </Grid>


                            </Grid>
                        </Box>
                    </Card>
                ))}

                {/* <Grid item xs={12}>
                    <Button type="button" >
                        Add Experience
                    </Button>
                </Grid> */}

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} >
                    <AddCircleOutlineIcon style={{ color: 'blue', cursor: 'pointer', height: '35px' }} onClick={() => addExperience()} />
                </div>
            </Grid>



        </form>

    )
}


export default ExperienceForm



