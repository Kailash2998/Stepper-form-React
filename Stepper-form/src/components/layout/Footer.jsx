// // src/components/layout/Footer.js
// import React from 'react';
// import { AppBar, Toolbar, Typography,  } from '@mui/material';
// const Footer = () => {
//   return (
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         <Typography variant="body1" style={{ flexGrow: 1 }}>
//         © {new Date().getFullYear()} User Registration App. All rights reserved.
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Footer;



import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="body1" style={{ flexGrow: 1 }}>
          © {new Date().getFullYear()} User Registration App. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
