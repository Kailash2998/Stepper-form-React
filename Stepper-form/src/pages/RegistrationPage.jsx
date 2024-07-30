// import React, { useState } from 'react';
// import { Container, Stepper, Step, StepLabel, Typography, Grid } from '@mui/material';
// import UserForm from '../components/forms/UserForm';
// import EducationForm from '../components/forms/EducationForm';
// import WorkExperienceForm from '../components/forms/WorkExperienceForm';
// import UploadPhotoForm from '../components/forms/UploadPhotoForm';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, Link } from 'react-router-dom';

// const RegistrationPage = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     mobile: '',
//     gender: '',
//     dob: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//     degree: '',
//     university: '',
//     yearOfPassing: '',
//     percentage: '',
//     organizationName: '',
//     companyAddress: '',
//     yearsWorked: '',
//     designation: '',
//     profilePhoto: null,
//     role: 'user',
//   });

//   const [emailChecked, setEmailChecked] = useState(false);
//   const [, setIsEmailUnique] = useState(false);

//   const steps = [
//     'User Information',
//     'Education Details',
//     'Work Experience',
//     'Upload Photo',
//   ];

//   const handleNext = () => {
//     if (activeStep === 0 && !emailChecked) {
//       checkEmailUnique().then(isUnique => {
//         setEmailChecked(true);
//         setIsEmailUnique(isUnique);
//         if (isUnique) {
//           setActiveStep(activeStep + 1);
//         } else {
//           toast.error('This email is already registered. Please use a different email.', {
//             position: 'top-right',
//             autoClose: 3000,
//           });
//         }
//       });
//     } else {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     setActiveStep(activeStep - 1);
//   };

//   const checkEmailUnique = async () => {
//     try {
//       const response = await axios.get(`http://localhost:7000/users/check-email?email=${formData.email}`);
//       return response.data.isUnique;
//     } catch (error) {
//       toast.error('Error checking email uniqueness. Please try again later.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       console.error('Error checking email uniqueness:', error);
//       return false;
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:7000/users', formData);
//       toast.success('Registration successful!', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       navigate('/login');
//     } catch (error) {
//       toast.error('Error registering user. Please try again later.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       console.error('Error registering user:', error);
//     }
//   };

//   const getFormComponent = (stepIndex) => {
//     switch (stepIndex) {
//       case 0:
//         return <UserForm
//           formData={formData}
//           setFormData={setFormData}
//           onNext={handleNext}
//         />;
//       case 1:
//         return <EducationForm
//           formData={formData}
//           setFormData={setFormData}
//           onNext={handleNext}
//           onPrevious={handlePrevious}
//         />;
//       case 2:
//         return <WorkExperienceForm
//           formData={formData}
//           setFormData={setFormData}
//           onNext={handleNext}
//           onPrevious={handlePrevious}
//         />;
//       case 3:
//         return <UploadPhotoForm
//           formData={formData}
//           setFormData={setFormData}
//           onPrevious={handlePrevious}
//           onSubmit={handleSubmit}
//         />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Container>
//       <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {getFormComponent(activeStep)}
//       </div>
//       <Grid item xs={12}>
//         <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//           Already have an account? <Link to="/login">Login</Link>
//         </Typography>
//       </Grid>
//       <ToastContainer />
//     </Container>
//   );
// };

// export default RegistrationPage;


import React, { useState } from 'react';
import { Container, Stepper, Step, StepLabel, Typography, Grid } from '@mui/material';
import UserForm from '../components/forms/UserForm';
import EducationForm from '../components/forms/EducationForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import UploadPhotoForm from '../components/forms/UploadPhotoForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    dob: '',
    address: '',
    password: '',
    confirmPassword: '',
    degree: '',
    university: '',
    yearOfPassing: '',
    percentage: '',
    organizationName: '',
    companyAddress: '',
    yearsWorked: '',
    designation: '',
    profilePhoto: null,
    role: 'user',
  });

  const [emailChecked, setEmailChecked] = useState(false);

  const steps = [
    'User Information',
    'Education Details',
    'Work Experience',
    'Upload Photo',
  ];

  const handleNext = () => {
    if (activeStep === 0 && !emailChecked) {
      checkEmailUnique().then(isUnique => {
        setEmailChecked(true);
        if (isUnique) {
          setActiveStep(activeStep + 1);
        } else {
          toast.error('This email is already registered. Please use a different email.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const checkEmailUnique = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/users/check-email?email=${formData.email}`);
      return response.data.isUnique;
    } catch (error) {
      toast.error('Error checking email uniqueness. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error checking email uniqueness:', error);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:7000/users', formData);
      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
    } catch (error) {
      toast.error('Error registering user. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error registering user:', error);
    }
  };

  const getFormComponent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <UserForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />;
      case 1:
        return <EducationForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />;
      case 2:
        return <WorkExperienceForm
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />;
      case 3:
        return <UploadPhotoForm
          formData={formData}
          setFormData={setFormData}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getFormComponent(activeStep)}
      </div>
      <Grid item xs={12}>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default RegistrationPage;
