// UserForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, RadioGroup, Radio, FormControlLabel, Grid, Typography } from '@mui/material';
import { AccountCircle, Email, Phone, DateRange, Home, Lock } from '@mui/icons-material'; // Import icons

const UserForm = ({ formData, setFormData, onNext, onPrevious }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required('First Name is required')
      .matches(/^[a-zA-Z\s]*$/, 'Only alphabets and spaces are allowed')
      .min(2, 'First Name must be at least 2 characters')
      .max(50, 'First Name must not exceed 50 characters'),
  
    lastName: Yup.string()
      .trim()
      .required('Last Name is required')
      .matches(/^[a-zA-Z\s]*$/, 'Only alphabets and spaces are allowed')
      .min(2, 'Last Name must be at least 2 characters')
      .max(50, 'Last Name must not exceed 50 characters'),
  
    email: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required')
      .matches(/^[a-z][a-z0-9]*@gmail\.com$/, 'Email must start with a letter and be @gmail.com'),
  
    mobile: Yup.string()
      .required('Mobile Phone is required')
      .matches(/^[0-9]{10}$/, 'Mobile Phone must be a 10-digit number'),
  
    gender: Yup.string()
      .required('Gender is required')
      .oneOf(['male', 'female', 'other'], 'Gender must be male, female, or other'),
  
    dob: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),
  
    address: Yup.string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters'),
  
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values) => {
    setFormData({ ...formData, ...values });
    onNext();
  };

  return (
    <Formik
      initialValues={{
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || '',
        mobile: formData.mobile || '',
        gender: formData.gender || 'male',
        dob: formData.dob || '',
        address: formData.address || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} name="firstName" label="First Name" fullWidth InputProps={{ startAdornment: <AccountCircle /> }} />
              {errors.firstName && touched.firstName && <Typography color="error">{errors.firstName}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} name="lastName" label="Last Name" fullWidth InputProps={{ startAdornment: <AccountCircle /> }} />
              {errors.lastName && touched.lastName && <Typography color="error">{errors.lastName}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} name="email" type="email" label="Email Address" fullWidth InputProps={{ startAdornment: <Email /> }} />
              {errors.email && touched.email && <Typography color="error">{errors.email}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} name="mobile" type='number' label="Mobile Phone" fullWidth InputProps={{ startAdornment: <Phone /> }} />
              {errors.mobile && touched.mobile && <Typography color="error">{errors.mobile}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <RadioGroup name="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} row>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
              {errors.gender && touched.gender && <Typography color="error">{errors.gender}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} name="dob" type="date" label="Date of Birth" fullWidth InputProps={{ startAdornment: <DateRange /> }} />
              {errors.dob && touched.dob && <Typography color="error">{errors.dob}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} name="address" label="Address" multiline rows={4} fullWidth InputProps={{ startAdornment: <Home /> }} />
              {errors.address && touched.address && <Typography color="error">{errors.address}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} name="password" type="password" label="Password" fullWidth InputProps={{ startAdornment: <Lock /> }} />
              {errors.password && touched.password && <Typography color="error">{errors.password}</Typography>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} name="confirmPassword" type="password" label="Confirm Password" fullWidth InputProps={{ startAdornment: <Lock /> }} />
              {errors.confirmPassword && touched.confirmPassword && <Typography color="error">{errors.confirmPassword}</Typography>}
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

export default UserForm;
