import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const steps = ["Personal Information", "Education Details", "Work Experience"];

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  mobile: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  address: Yup.string().required("Required"),
  degree: Yup.string()
    .oneOf(["BE", "ME", "BSc", "MSc"], "Invalid degree")
    .required("Required"),
  university: Yup.string().required("Required"),
  yearOfPassing: Yup.number().required("Required"),
  percentage: Yup.number().required("Required"),
  organizationName: Yup.string().required("Required"),
  companyAddress: Yup.string().required("Required"),
  yearsWorked: Yup.number().required("Required"),
  designation: Yup.string().required("Required"),
});

const degrees = [
  { value: "BE", label: "BE" },
  { value: "ME", label: "ME" },
  { value: "BSc", label: "BSc" },
  { value: "MSc", label: "MSc" },
];

const LoadAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:7000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditedUser({});
    setActiveStep(0);
  };

  

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const updateUser = (values) => {
    axios
      .patch(`http://localhost:7000/users/${values.id}`, values)
      .then(() => {
        setUsers(users.map((user) => (user.id === values.id ? values : user)));
        handleCloseDialog();
      })
      .catch((error) => console.error(error));
  };

  const handleOpenConfirmDialog = (userId) => {
    setUserToDelete(userId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setUserToDelete(null);
  };

  const confirmDeleteUser = () => {
    axios
      .delete(`http://localhost:7000/users/${userToDelete}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userToDelete));
        handleCloseConfirmDialog();
      })
      .catch((error) => console.error(error));
  };

  const denyAccess = (userId) => {
    axios
      .patch(`http://localhost:7000/users/${userId}`, { approved: false })
      .then(() =>
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, approved: false } : user
          )
        )
      )
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.degree}</TableCell>
                <TableCell>{user.organizationName}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell>{user.approved ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() => handleOpenDialog(user)}
                      color="primary"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenConfirmDialog(user.id)}
                      color="secondary"
                      aria-label="delete"
                      style={{ marginLeft: 8 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {user.approved && (
                      <Button
                        onClick={() => denyAccess(user.id)}
                        color="error"
                        variant="contained"
                        style={{ marginLeft: 8 }}
                      >
                        Deny Access
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
         <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={editedUser}
            validationSchema={validationSchema}
            onSubmit={updateUser}
          >
            {({   handleBlur }) => (
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
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            variant="outlined"
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
                            <InputLabel>Degree</InputLabel>
                            <Field
                              as={Select}
                              name="degree"
                              label="Degree"
                              fullWidth
                              variant="outlined"
                            >
                              {degrees.map((degree) => (
                                <MenuItem
                                  key={degree.value}
                                  value={degree.value}
                                >
                                  {degree.label}
                                </MenuItem>
                              ))}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoadAllUsers;
