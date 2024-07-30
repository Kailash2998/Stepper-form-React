// import React from 'react';
// import { Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <Drawer variant="permanent">
//       <List>
//         <ListItem button component={Link} to="/">
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={Link} to="/admin">
//           <ListItemText primary="Admin" />
//         </ListItem>
//         <ListItem button component={Link} to="/profile">
//           <ListItemText primary="Profile" />
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;


import React from 'react';

import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        {user && user.role === 'admin' && (
          <ListItem button component={Link} to="/admin">
            <ListItemText primary="Admin" />
          </ListItem>
        )}
        {user && (
          <ListItem button component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/user-dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
