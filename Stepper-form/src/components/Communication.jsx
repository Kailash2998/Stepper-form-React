// import React, { useState, useEffect } from 'react';
// import { Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
// import axios from 'axios';

// const Communication = ({ user }) => {
//   const [message, setMessage] = useState('');
//   const [friendRequests, setFriendRequests] = useState([]);
//   const [communications, setCommunications] = useState([]);

//   const handleSendRequest = () => {
//     // Example: Sending friend request to another user (assuming userId is passed)
//     axios.post(`http://localhost:7000/users/${user.id}/friend-requests`, { senderId: user.id, message })
//       .then(response => {
//         console.log('Friend request sent successfully:', response.data);
//         // Optionally, update state or show a notification
//       })
//       .catch(error => {
//         console.error('Error sending friend request:', error);
//       });
//   };

//   const handleSendMessage = () => {
//     // Example: Sending a message to another user (assuming userId is passed)
//     axios.post(`http://localhost:7000/users/${user.id}/messages`, { senderId: user.id, message })
//       .then(response => {
//         console.log('Message sent successfully:', response.data);
//         // Optionally, update state or show a notification
//       })
//       .catch(error => {
//         console.error('Error sending message:', error);
//       });
//   };

//   const handleAcceptRequest = (requestId) => {
//     // Example: Accepting a friend request (assuming requestId is passed)
//     axios.put(`http://localhost:7000/friend-requests/${requestId}/accept`)
//       .then(response => {
//         console.log('Friend request accepted successfully:', response.data);
//         // Optionally, update state or show a notification
//       })
//       .catch(error => {
//         console.error('Error accepting friend request:', error);
//       });
//   };

//   const handleRejectRequest = (requestId) => {
//     // Example: Rejecting a friend request (assuming requestId is passed)
//     axios.put(`http://localhost:7000/friend-requests/${requestId}/reject`)
//       .then(response => {
//         console.log('Friend request rejected successfully:', response.data);
//         // Optionally, update state or show a notification
//       })
//       .catch(error => {
//         console.error('Error rejecting friend request:', error);
//       });
//   };

//   const handleLoadFriendRequests = () => {
//     // Example: Fetching friend requests for the current user
//     axios.get(`http://localhost:7000/users/${user.id}/friend-requests`)
//       .then(response => {
//         setFriendRequests(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching friend requests:', error);
//       });
//   };

//   const handleLoadCommunications = () => {
//     // Example: Fetching communications for the current user
//     axios.get(`http://localhost:7000/users/${user.id}/communications`)
//       .then(response => {
//         setCommunications(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching communications:', error);
//       });
//   };

//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>Communications</Typography>

//       {/* Friend Request Section */}
//       <Typography variant="h6" gutterBottom>Friend Requests</Typography>
//       <List>
//         {friendRequests.map(request => (
//           <ListItem key={request.id}>
//             <ListItemText primary={request.senderName} secondary={request.message} />
//             <Button onClick={() => handleAcceptRequest(request.id)}>Accept</Button>
//             <Button onClick={() => handleRejectRequest(request.id)}>Reject</Button>
//           </ListItem>
//         ))}
//       </List>

//       {/* Send Friend Request Section */}
//       <Typography variant="h6" gutterBottom>Send Friend Request</Typography>
//       <TextField
//         label="Message"
//         variant="outlined"
//         fullWidth
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <Button variant="contained" color="primary" onClick={handleSendRequest}>Send Request</Button>

//       {/* Communication Section */}
//       <Typography variant="h6" gutterBottom>Communications</Typography>
//       <List>
//         {communications.map(message => (
//           <ListItem key={message.id}>
//             <ListItemText primary={message.senderName} secondary={message.content} />
//           </ListItem>
//         ))}
//       </List>

//       {/* Send Message Section */}
//       <Typography variant="h6" gutterBottom>Send Message</Typography>
//       <TextField
//         label="Message"
//         variant="outlined"
//         fullWidth
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <Button variant="contained" onClick={handleSendMessage}>Send Message</Button>
//     </div>
//   );
// };

// export default Communication;
