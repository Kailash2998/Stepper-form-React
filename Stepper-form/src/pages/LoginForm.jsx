// import React from 'react';
// import { Container, TextField, Button, Typography, Grid, InputAdornment } from '@mui/material';
// import { Email, Lock } from '@mui/icons-material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginForm = () => {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object().shape({
//       email: Yup.string().email('Invalid email format').required('Email is required'),
//       password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//     }),
//     onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
//       try {
//         const response = await axios.get(`http://localhost:7000/users?email=${values.email}`);
//         const user = response.data[0];

//         if (user && user.password === values.password) {
//           if (!user.approved) {
//             toast.error('Your account is pending approval. Please wait for admin approval.', {
//               position: 'top-right',
//               autoClose: 5000,
//             });
//             resetForm();
//             return;
//           }

//           localStorage.setItem('user', JSON.stringify(user));
//           toast.success('Login successful!', {
//             position: 'top-right',
//             autoClose: 3000,
//           });
//           navigate(user.role === 'admin' ? '/admin' : '/user-dashboard');
//         } else {
//           setFieldError('email', 'Invalid email or password');
//           setFieldError('password', 'Invalid email or password');
//           toast.error('Invalid email or password. Please try again.', {
//             position: 'top-right',
//             autoClose: 3000,
//           });
//           resetForm(); // Reset the form fields
//         }
//       } catch (error) {
//         toast.error('Error fetching user details. Please try again.', {
//           position: 'top-right',
//           autoClose: 3000,
//         });
//         console.error('Fetch user details error:', error);
//       }
//       setSubmitting(false);
//     },
//   });

//   return (
//     <Container maxWidth="sm">
//       <ToastContainer position="top-right" />
//       <Typography variant="h4" align="center" gutterBottom>
//         Login
//       </Typography>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="email"
//           label="Email Address"
//           name="email"
//           type="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Email />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           id="password"
//           label="Password"
//           name="password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Lock />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           disabled={formik.isSubmitting}
//         >
//           Sign In
//         </Button>

//         <Grid container justifyContent="flex-end">
//           <Grid item>
//             <Typography variant="body2" color="textSecondary" style={{ marginTop: 16 }}>
//               Don't have an account? <Link to="/registration">Register</Link>
//             </Typography>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default LoginForm;


import React from 'react';
import { Container, TextField, Button, Typography, Grid, InputAdornment } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      try {
        console.log('Login attempt with values:', values); // Debugging log
        const response = await axios.get(`http://localhost:7000/users?email=${values.email}`);
        const user = response.data[0];

        console.log('Fetched user:', user); // Debugging log

        if (user && user.password === values.password) {
          if (!user.approved) {
            toast.error('Your account is pending approval. Please wait for admin approval.', {
              position: 'top-right',
              autoClose: 5000,
            });
            resetForm();
            return;
          }

          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Login successful!', {
            position: 'top-right',
            autoClose: 3000,
          });
          navigate(user.role === 'admin' ? '/admin' : '/user-dashboard');
        } else {
          setFieldError('email', 'Invalid email or password');
          setFieldError('password', 'Invalid email or password');
          toast.error('Invalid email or password. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
          });
          resetForm(); // Reset the form fields
        }
      } catch (error) {
        toast.error('Error fetching user details. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
        console.error('Fetch user details error:', error);
      }
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="sm">
      <ToastContainer position="top-right" />
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
        >
          Sign In
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: 16 }}>
              Don't have an account? <Link to="/registration">Register</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginForm;
