
// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { AccountCircle } from '@mui/icons-material'; // Import icon for user profile

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/', { replace: true });
//     window.location.reload();
//   };

//   const isAuthenticated = !!localStorage.getItem('user');
//   const user = JSON.parse(localStorage.getItem('user'));

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Avatar sx={{ bgcolor: 'transparent', marginRight: '10px' }}>
//           <AccountCircle /> {/* Icon for the application */}
//         </Avatar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           User Registration App
//         </Typography>
//         {!isAuthenticated && (
//           <Button color="inherit" component={Link} to="/registration">
//             Register
//           </Button>
//         )}
//         {isAuthenticated && (
//           <>
//             <Typography variant="body1" style={{ marginRight: '10px', color: 'white' }}>
//               {user.firstName} {user.lastName}
//             </Typography>
//             {/* Link to Profile Page */}
//             <Button color="inherit" component={Link} to="/profile">
//               <Avatar sx={{ bgcolor: 'transparent' }}>
//                 {/* {user.firstName.charAt(0)} */}
//               </Avatar>
//             </Button>
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material'; // Import icon for user profile

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/', { replace: true });
    window.location.reload();
  };

  const isAuthenticated = !!localStorage.getItem('user');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar sx={{ bgcolor: 'transparent', marginRight: '10px' }}>
          <AccountCircle />
        </Avatar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          User Registration App
        </Typography>
        {!isAuthenticated && (
          <Button color="inherit" component={Link} to="/registration">
            Register
          </Button>
        )}
        {isAuthenticated && (
          <>
            <Typography variant="body1" style={{ marginRight: '10px', color: 'white' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Button color="inherit" component={Link} to={`/profile/${user.id}`}>
              <Avatar sx={{ bgcolor: 'transparent' }}>
                {/* Display user initials or icon */}
              </Avatar>
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
