// import React from 'react';
// import { LinearProgress } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const Root = styled('div')(({ theme }) => ({
//   width: '100%',
//   marginTop: theme.spacing(1),
//   marginBottom: theme.spacing(3),
// }));

// const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   '& .MuiLinearProgress-bar': {
//     borderRadius: 5,
//     backgroundColor: '#1a90ff',
//   },
// }));

// const Progressbar = ({ activeStep }) => {
//   // Calculate the progress value based on activeStep (0-indexed)
//   const calculateProgress = () => {
//     return Math.floor((activeStep / 3) * 100); 
//   };

//   return (
//     <Root>
//       <CustomLinearProgress variant="determinate" value={calculateProgress()} />
//     </Root>
//   );
// };

// export default Progressbar;


import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const ProgressBar = ({ activeStep, totalSteps }) => {
  const progress = (activeStep / totalSteps) * 100;

  return (
    <Box width="100%" mt={2} mb={4}>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="body2" color="textSecondary">{`Step ${activeStep + 1} of ${totalSteps}`}</Typography>
    </Box>
  );
};

export default ProgressBar;
