// // import React, { useEffect, useState } from 'react';
// // import { Container, List, ListItem, ListItemText, Button, Drawer, Typography } from '@mui/material';
// // import axios from 'axios';

// // const AdminPage = () => {
// //   const [users, setUsers] = useState([]);
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   useEffect(() => {
// //     // Fetch users data from json-server on component mount
// //     axios.get('http://localhost:7000/users')
// //       .then(response => {
// //         setUsers(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching users:', error);
// //       });
// //   }, []);

// //   const handleApprove = (userId) => {
// //     // Simulate approval by updating user data (e.g., setting approved flag)
// //     const updatedUsers = users.map(user => {
// //       if (user.id === userId) {
// //         return { ...user, approved: true };
// //       }
// //       return user;
// //     });

// //     // Update UI optimistically
// //     setUsers(updatedUsers);

// //     // Update json-server backend (simulate PATCH request)
// //     axios.patch(`http://localhost:7000/users/${userId}`, { approved: true })
// //       .then(response => {
// //         console.log('User approval successful:', response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error approving user:', error);
// //         // Revert UI changes on error
// //         setUsers(users);
// //       });
// //   };

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   return (
// //     <>
// //       {/* Sidebar */}
// //       <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
// //         <List>
// //           <ListItem button>
// //             <ListItemText primary="Dashboard" />
// //           </ListItem>
// //           {/* Add more sidebar links as needed */}
// //         </List>
// //       </Drawer>

// //       {/* Main Content */}
// //       <Container>
// //         <Typography variant="h3" style={{ marginBottom: '20px' }}>Admin Page</Typography>
// //         <Button variant="outlined" onClick={toggleSidebar} style={{ marginBottom: '20px' }}>
// //           Toggle Sidebar
// //         </Button>
// //         <List>
// //           {users.map(user => (
// //             <ListItem key={user.id}>
// //               <ListItemText
// //                 primary={`${user.firstName} ${user.lastName}`}
// //                 secondary={`Email: ${user.email}, Approved: ${user.approved ? 'Yes' : 'No'}`}
// //               />
// //               {!user.approved && (
// //                 <Button variant="contained" color="primary" onClick={() => handleApprove(user.id)}>
// //                   Approve
// //                 </Button>
// //               )}
// //             </ListItem>
// //           ))}
// //         </List>
// //       </Container>
// //     </>
// //   );
// // };

// // export default AdminPage;


// import React, { useEffect, useState } from 'react';
// import { Container, List, ListItem, ListItemText, Button, Drawer, Typography, Divider, IconButton } from '@mui/material';
// import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, Settings as SettingsIcon } from '@mui/icons-material';
// import axios from 'axios';

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     // Fetch users data from json-server on component mount
//     axios.get('http://localhost:7000/users')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   const handleApprove = (userId) => {
//     // Simulate approval by updating user data (e.g., setting approved flag)
//     const updatedUsers = users.map(user => {
//       if (user.id === userId) {
//         return { ...user, approved: true };
//       }
//       return user;
//     });

//     // Update UI optimistically
//     setUsers(updatedUsers);

//     // Update json-server backend (simulate PATCH request)
//     axios.patch(`http://localhost:7000/users/${userId}`, { approved: true })
//       .then(response => {
//         console.log('User approval successful:', response.data);
//       })
//       .catch(error => {
//         console.error('Error approving user:', error);
//         // Revert UI changes on error
//         setUsers(users);
//       });
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <Drawer
//         anchor="left"
//         open={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         sx={{
//           width: 180,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: 180,
//             boxSizing: 'border-box',
//             maxHeight: '700px',
//             marginTop: '65px',
//           },
//         }}
//       >
//         <div>
//           <Typography variant="h6" sx={{ padding: 1, textAlign: 'center' }}>Admin Panel</Typography>
//           <Divider />
//           <List>
//             <ListItem button>
//               <DashboardIcon sx={{ marginRight: 1 }} />
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <ListItem button>
//               <PeopleIcon sx={{ marginRight: 1 }} />
//               <ListItemText primary="Users" />
//             </ListItem>
//             <ListItem button>
//               <SettingsIcon sx={{ marginRight: 1 }} />
//               <ListItemText primary="Settings" />
//             </ListItem>
//           </List>
//         </div>
//       </Drawer>

//       {/* Main Content */}
//       <Container
//         sx={{
//           marginLeft: sidebarOpen ? '180px' : '0px',
//           transition: 'margin-left 0.3s ease',
//           paddingTop: 2,
//           paddingBottom: 2
//         }}
//       >
//         <IconButton
//           color="primary"
//           aria-label="menu"
//           onClick={toggleSidebar}
//           sx={{ margin: 2 }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h3" sx={{ marginBottom: 2 }}>Admin Page</Typography>
//         <List>
//           {users.map(user => (
//             <ListItem key={user.id} sx={{ marginBottom: 2, border: '1px solid #ddd', borderRadius: 1, padding: 2 }}>
//               <ListItemText
//                 primary={`${user.firstName} ${user.lastName}`}
//                 secondary={`Email: ${user.email}, Approved: ${user.approved ? 'Yes' : 'No'}`}
//               />
//               {!user.approved && (
//                 <Button variant="contained" color="primary" onClick={() => handleApprove(user.id)}>
//                   Approve
//                 </Button>
//               )}
//             </ListItem>
//           ))}
//         </List>
//       </Container>
//     </>
//   );
// };

// export default AdminPage;


import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Drawer, Typography, Divider, IconButton } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Make sure this is imported correctly
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch users data from json-server on component mount
    axios.get('http://localhost:7000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleApprove = (userId) => {
    // Simulate approval by updating user data (e.g., setting approved flag)
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, approved: true };
      }
      return user;
    });

    // Update UI optimistically
    setUsers(updatedUsers);

    // Update json-server backend (simulate PATCH request)
    axios.patch(`http://localhost:7000/users/${userId}`, { approved: true })
      .then(response => {
        console.log('User approval successful:', response.data);
      })
      .catch(error => {
        console.error('Error approving user:', error);
        // Revert UI changes on error
        setUsers(users);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          width: 180,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 180,
            boxSizing: 'border-box',
            maxHeight: '700px',
            marginTop: '65px',
          },
        }}
      >
        <div>
          <Typography variant="h6" sx={{ padding: 1, textAlign: 'center' }}>Admin Panel</Typography>
          <Divider />
          <List>
            <ListItem button component={Link} to="/admin-dashboard">
              <DashboardIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/admin/loadAllUser">
              <PeopleIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button component={Link} to="/admin-settings">
              <SettingsIcon sx={{ marginRight: 1 }} />
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Main Content */}
      <Container
        sx={{
          marginLeft: sidebarOpen ? '180px' : '0px',
          transition: 'margin-left 0.3s ease',
          paddingTop: 2,
          paddingBottom: 2
        }}
      >
        <IconButton
          color="primary"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ margin: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>Admin Page</Typography>
        <List>
          {users.map(user => (
            <ListItem key={user.id} sx={{ marginBottom: 2, border: '1px solid #ddd', borderRadius: 1, padding: 2 }}>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={`Email: ${user.email}, Approved: ${user.approved ? 'Yes' : 'No'}`}
              />
              {!user.approved && (
                <Button variant="contained" color="primary" onClick={() => handleApprove(user.id)}>
                  Approve
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AdminPage;
