import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams,  } from "react-router-dom";
import {
  AccountCircle,
  Email,
  Phone,
  DateRange,
  Home,
  School,
  Business,
  LocationOn,
  Work,
} from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^\d+$/, "Mobile number must be digits")
    .required("Mobile number is required"),
  dob: Yup.date().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  degree: Yup.string().required("Degree is required"),
  university: Yup.string().required("University is required"),
  yearOfPassing: Yup.number()
    .positive("Year of passing must be a positive number")
    .required("Year of passing is required"),
  percentage: Yup.number()
    .min(0, "Percentage cannot be negative")
    .max(100, "Percentage cannot be more than 100")
    .required("Percentage is required"),
  organizationName: Yup.string().required("Organization name is required"),
  companyAddress: Yup.string().required("Company address is required"),
  yearsWorked: Yup.number()
    .positive("Years worked must be a positive number")
    .required("Years worked is required"),
  designation: Yup.string().required("Designation is required"),
});

const steps = ["Personal Information", "Education Details", "Work Experience"];

const ProfilePage = () => {
  const { id } = useParams(); // Get id from URL parameters
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        setError("No user ID provided in URL");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:7000/users/${id}`);
        setUserData(response.data);
      } catch (fetchError) {
        setError("Error fetching user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleBackMain = () => {
    window.history.back();
  };

  const handleBackToProfile = () => {
    setEditMode(false);
    setActiveStep(0);
  };

  const handleSave = async (values) => {
    try {
      await axios.put(`http://localhost:7000/users/${id}`, values);
      setEditMode(false);
      setActiveStep(0);
      window.location.reload();
    } catch (saveError) {
      setError("Error updating user data. Please try again later.");
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!userData || !userData.id) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">No user data available.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        {editMode ? (
          <Formik
            initialValues={userData}
            validationSchema={validationSchema}
            onSubmit={handleSave}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box mt={3}>
                  <Paper elevation={3} style={{ padding: 16 }}>
                    {activeStep === 0 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <AccountCircle /> First Name
                              </>
                            }
                            name="firstName"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <AccountCircle /> Last Name
                              </>
                            }
                            name="lastName"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <Email /> Email Address
                              </>
                            }
                            name="email"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <Phone /> Mobile Number
                              </>
                            }
                            name="mobile"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="mobile"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <DateRange /> Date of Birth
                              </>
                            }
                            name="dob"
                            type="date"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="dob"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <Home /> Address
                              </>
                            }
                            name="address"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {activeStep === 1 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="degree-label">
                              <School /> Degree
                            </InputLabel>
                            <Field
                              as={Select}
                              labelId="degree-label"
                              name="degree"
                              label="Degree"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <MenuItem value="BE">BE</MenuItem>
                              <MenuItem value="ME">ME</MenuItem>
                              <MenuItem value="BSc">BSc</MenuItem>
                              <MenuItem value="MSc">MSc</MenuItem>
                            </Field>
                          </FormControl>
                          <ErrorMessage
                            name="degree"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <School /> University
                              </>
                            }
                            name="university"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="university"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <DateRange /> Year of Passing
                              </>
                            }
                            name="yearOfPassing"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="yearOfPassing"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <DateRange /> Percentage
                              </>
                            }
                            name="percentage"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="percentage"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    {activeStep === 2 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <Business /> Organization Name
                              </>
                            }
                            name="organizationName"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="organizationName"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <LocationOn /> Company Address
                              </>
                            }
                            name="companyAddress"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="companyAddress"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <Work /> Years Worked
                              </>
                            }
                            name="yearsWorked"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="yearsWorked"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label={
                              <>
                                <Work /> Designation
                              </>
                            }
                            name="designation"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="designation"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Box mt={2} display="flex" justifyContent="space-between">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                      >
                        Next
                      </Button>
                      {activeStep === steps.length - 1 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Save
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Box>
              </Form>
            )}
          </Formik>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">Personal Information</Typography>
              <Typography variant="body1">
                <AccountCircle /> {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="body1">
                <Email /> {userData.email}
              </Typography>
              <Typography variant="body1">
                <Phone /> {userData.mobile}
              </Typography>
              <Typography variant="body1">
                <DateRange /> {userData.dob}
              </Typography>
              <Typography variant="body1">
                <Home /> {userData.address}
              </Typography>
              <Typography variant="h6">Education Details</Typography>
              <Typography variant="body1">
                <School /> {userData.degree}
              </Typography>
              <Typography variant="body1">
                <School /> {userData.university}
              </Typography>
              <Typography variant="body1">
                <School /> {userData.yearOfPassing}
              </Typography>
              <Typography variant="body1">
                <School /> {userData.percentage}%
              </Typography>
              <Typography variant="h6">Work Experience</Typography>
              <Typography variant="body1">
                <Business /> {userData.organizationName}
              </Typography>
              <Typography variant="body1">
                <LocationOn /> {userData.companyAddress}
              </Typography>
              <Typography variant="body1">
                <Work /> {userData.yearsWorked} years
              </Typography>
              <Typography variant="body1">
                <Work /> {userData.designation}
              </Typography>

              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleBackMain}
                >
                  Back
                </Button>
                {editMode && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBackToProfile}
                    style={{ marginLeft: "10px" }}
                  >
                    Back to Profile
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
        {editMode && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBackToProfile}
            style={{ marginTop: 16 }}
          >
            Back to Profile
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
