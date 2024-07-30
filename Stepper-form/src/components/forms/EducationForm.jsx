// EducationForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { School, AccountBalance } from '@mui/icons-material'; // Import icons

const currentYear = new Date().getFullYear();

const EducationForm = ({ formData, setFormData, onNext, onPrevious }) => {
  const validationSchema = Yup.object().shape({
    degree: Yup.string()
    .trim()
    .required('Degree is required')
    .matches(/^[a-zA-Z\s]*$/, 'Only alphabets and spaces are allowed')
    .min(2, 'Degree must be at least 2 characters')
    .max(100, 'Degree must not exceed 100 characters'),

  university: Yup.string()
    .trim()
    .required('University is required')
    .matches(/^[a-zA-Z\s.]*$/, 'Only alphabets, spaces, and periods are allowed')
    .min(2, 'University must be at least 2 characters')
    .max(100, 'University must not exceed 100 characters'),

  yearOfPassing: Yup.number()
    .integer('Year of Passing must be an integer')
    .required('Year of Passing is required')
    .min(1960, 'Year of Passing must be at least 1960')
    .max(currentYear, `Year of Passing must not be greater than ${currentYear}`),

  percentage: Yup.number()
    .required('Percentage is required')
    .min(0, 'Percentage must be at least 0')
    .max(100, 'Percentage must not exceed 100')
});

  const handleSubmit = (values) => {
    setFormData({ ...formData, ...values });
    onNext();
  };

  return (
    <Formik
      initialValues={{
        degree: formData.degree || '',
        university: formData.university || '',
        yearOfPassing: formData.yearOfPassing || '',
        percentage: formData.percentage || '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="degree-label">Degree</InputLabel>
                <Field as={Select} name="degree" labelId="degree-label">
                  <MenuItem value="BE">BE</MenuItem>
                  <MenuItem value="ME">ME</MenuItem>
                  <MenuItem value="MCA">MCA</MenuItem>
                  <MenuItem value="MCS">MCS</MenuItem>
                </Field>
                {errors.degree && touched.degree && <div style={{ color: 'red' }}>{errors.degree}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="university"
                label="University"
                variant="outlined"
                fullWidth
                error={errors.university && touched.university}
                helperText={errors.university && touched.university ? errors.university : ''}
                InputProps={{ startAdornment: <School /> }} // Icon added here
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                type="number"
                name="yearOfPassing"
                label="Year of Passing"
                variant="outlined"
                fullWidth
                error={errors.yearOfPassing && touched.yearOfPassing}
                helperText={errors.yearOfPassing && touched.yearOfPassing ? errors.yearOfPassing : ''}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                type="number"
                name="percentage"
                label="Percentage"
                variant="outlined"
                fullWidth
                error={errors.percentage && touched.percentage}
                helperText={errors.percentage && touched.percentage ? errors.percentage : ''}
                InputProps={{ startAdornment: <AccountBalance /> }} // Icon added here
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="secondary" onClick={onPrevious}>
                  Previous
                </Button>
                <Button variant="contained" color="error" type="submit">
                  Next
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default EducationForm;
