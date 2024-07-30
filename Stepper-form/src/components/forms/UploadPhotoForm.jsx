// // UploadPhotoForm.js
// import React, { useRef } from 'react';
// import { Button, Grid, Typography } from '@mui/material';

// const UploadPhotoForm = ({ formData, setFormData, onPrevious, onSubmit }) => {
//   const fileInputRef = useRef(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFormData({ ...formData, profilePhoto: file });
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//           id="upload-photo-input"
//         />
//         <label htmlFor="upload-photo-input">
//           <Button variant="contained" component="span">
//             Upload Profile Photo
//           </Button>
//         </label>
//       </Grid>
//       {formData.profilePhoto && (
//         <Grid item xs={12}>
//           <div style={{ textAlign: 'center' }}>
//             <Typography variant="h6">Preview:</Typography>
//             <img
//               src={URL.createObjectURL(formData.profilePhoto)}
//               alt="Preview"
//               style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
//             />
//           </div>
//         </Grid>
//       )}
//       <Grid item xs={12}>
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Button variant="contained"  onClick={onPrevious}>
//             Previous
//           </Button>
//           <Button variant="contained"  onClick={onSubmit}>
//             Submit
//           </Button>
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default UploadPhotoForm;









// // import React, { useRef } from 'react';
// // import { Button, Grid, Typography } from '@mui/material';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';

// // // Define the photo validation schema
// // const photoValidationSchema = Yup.object().shape({
// //   profilePhoto: Yup.mixed()
// //     .required('A profile photo is required')
// //     .test(
// //       'fileType',
// //       'Only image files are allowed',
// //       //(value) => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
// //     )
// //     .test(
// //       'fileSize',
// //       'File size should not exceed 2MB',
// //       (value) => value && value.size <= 2 * 1024 * 1024 // 2MB
// //     ),
// // });

// // const UploadPhotoForm = ({ formData, setFormData, onPrevious, onSubmit }) => {
// //   const fileInputRef = useRef(null);

// //   const formik = useFormik({
// //     initialValues: {
// //       profilePhoto: formData.profilePhoto || null,
// //     },
// //     validationSchema: photoValidationSchema,
// //     onSubmit: (values) => {
// //       setFormData({ ...formData, profilePhoto: values.profilePhoto });
// //       onSubmit();
// //     },
// //   });

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     formik.setFieldValue('profilePhoto', file);
// //   };

// //   return (
// //     <form onSubmit={formik.handleSubmit}>
// //       <Grid container spacing={2}>
// //         <Grid item xs={12}>
// //           <input
// //             type="file"
// //             accept="image/*"
// //             ref={fileInputRef}
// //             onChange={handleFileChange}
// //             style={{ display: 'none' }}
// //             id="upload-photo-input"
// //           />
// //           <label htmlFor="upload-photo-input">
// //             <Button variant="contained" component="span">
// //               Upload Profile Photo
// //             </Button>
// //           </label>
// //           {formik.errors.profilePhoto && formik.touched.profilePhoto && (
// //             <Typography color="error">{formik.errors.profilePhoto}</Typography>
// //           )}
// //         </Grid>
// //         {formik.values.profilePhoto && (
// //           <Grid item xs={12}>
// //             <div style={{ textAlign: 'center' }}>
// //               <Typography variant="h6">Preview:</Typography>
// //               <img
// //                 src={URL.createObjectURL(formik.values.profilePhoto)}
// //                 alt="Preview"
// //                 style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
// //               />
// //             </div>
// //           </Grid>
// //         )}
// //         <Grid item xs={12}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //             <Button variant="contained" onClick={onPrevious}>
// //               Previous
// //             </Button>
// //             <Button variant="contained" type="submit">
// //               Submit
// //             </Button>
// //           </div>
// //         </Grid>
// //       </Grid>
// //     </form>
// //   );
// // };

// // export default UploadPhotoForm;

import React, { useState } from 'react';
import { Button, Input, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const UploadPhotoForm = ({ formData, setFormData, onPrevious, onSubmit }) => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setFormData(prevData => ({
          ...prevData,
          profilePhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!photo) {
      toast.error('Please upload a photo before submitting.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    onSubmit();
  };

  return (
    <div>
      <Typography variant="h6">Upload Profile Photo</Typography>
      <Input type="file" accept="image/*" onChange={handlePhotoChange} />
      <Button variant="contained" onClick={onPrevious}>Previous</Button>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default UploadPhotoForm;
