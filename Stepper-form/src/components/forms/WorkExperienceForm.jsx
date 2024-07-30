// WorkExperienceForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { Business, LocationOn, Work } from '@mui/icons-material'; // Import icons


const WorkExperienceForm = ({ formData, setFormData, onNext, onPrevious }) => {
  const validationSchema = Yup.object().shape({
    organizationName: Yup.string()
    .trim()
    .required('Organization Name is required')
    .matches(/^[a-zA-Z\s.]*$/, 'Only alphabets, spaces, and periods are allowed')
    .min(2, 'Organization Name must be at least 2 characters')
    .max(100, 'Organization Name must not exceed 100 characters'),

  companyAddress: Yup.string()
    .required('Company Address is required')
    .min(5, 'Company Address must be at least 5 characters'),

    yearsWorked: Yup.number()
    .required('Years Worked is required')
    .min(0, 'Years Worked must be at least 0')
    .max(50, 'Years Worked must not exceed 50')
    .test('is-decimal', 'Years Worked must be a float', (value) => (value + "").match(/^\d+(\.\d+)?$/)),

  designation: Yup.string()
    .trim()
    .required('Designation is required')
    .matches(/^[a-zA-Z\s]*$/, 'Only alphabets and spaces are allowed')
    .min(2, 'Designation must be at least 2 characters')
    .max(100, 'Designation must not exceed 100 characters')
});

  const handleSubmit = (values) => {
    setFormData({ ...formData, ...values });
    onNext();
  };

  return (
    <Formik
      initialValues={{
        organizationName: formData.organizationName || '',
        companyAddress: formData.companyAddress || '',
        yearsWorked: formData.yearsWorked || '',
        designation: formData.designation || '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field as={TextField} name="organizationName" label="Organization Name" fullWidth InputProps={{ startAdornment: <Business /> }} />
              {errors.organizationName && touched.organizationName && <Typography color="error">{errors.organizationName}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} name="companyAddress" label="Company Address" fullWidth InputProps={{ startAdornment: <LocationOn /> }} />
              {errors.companyAddress && touched.companyAddress && <Typography color="error">{errors.companyAddress}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} name="yearsWorked" type="number" label="Years Worked" fullWidth InputProps={{ startAdornment: <Work /> }} />
              {errors.yearsWorked && touched.yearsWorked && <Typography color="error">{errors.yearsWorked}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} name="designation" label="Designation" fullWidth />
              {errors.designation && touched.designation && <Typography color="error">{errors.designation}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="secondary" onClick={onPrevious}>Previous</Button>
                <Button variant="contained" color="error" type="submit">Next</Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default WorkExperienceForm;
