import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const UserDashboard = () => {
  const [user, setUser] = useState(null); // State to hold logged-in user data
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.id) {
      setUser(loggedInUser);
    } else {
      // Redirect to login if user not logged in
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      // Fetch all users from the fake database except the current user
      axios
        .get(`http://localhost:7000/users?userId_ne=${user.id}`)
        .then((response) => {
          // Filter users with role 'user' and exclude the logged-in user
          const filteredUsers = response.data.filter((u) => u.role === 'user' && u.id !== user.id);
          setAllUsers(filteredUsers);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [user]);

  const handleFriendRequest = (friendId) => {
    if (!user || !user.id) {
      console.error("User is not defined or not logged in");
      return;
    }

    // Simulate sending friend request (not related to messaging)
    axios
      .post("http://localhost:7000/friendRequests", {
        requesterId: user.id,
        receiverId: friendId,
        status: "pending",
      })
      .then((response) => {
        console.log("Friend request sent:", response.data);

        // Remove the friend request button after sending request
        setAllUsers(allUsers.map(u => u.id === friendId ? { ...u, requested: true } : u));
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  };

  const handleSendMessage = () => {
    if (!user || !user.id) {
      console.error("User is undefined or user id is missing");
      return;
    }

    if (!selectedUser) {
      console.error("Selected user is undefined");
      return;
    }

    if (!messageContent.trim()) {
      console.error("Message content is empty");
      return;
    }

    // Prepare the message object
    const newMessage = {
      senderId: user.id,
      recipientId: selectedUser.id,
      message: messageContent,
      timestamp: new Date().toISOString(),
    };

    // Send message via axios POST request
    axios
      .post("http://localhost:7000/messages", newMessage)
      .then((response) => {
        console.log("Message sent successfully:", response.data);

        // Update local state with the sent message
        setMessages([...messages, response.data]);

        // Clear message input and close the chat dialog
        setMessageContent("");
        setOpenChat(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        // Add specific error handling logic if needed
      });
  };

  const handleMessageButtonClick = (user) => {
    setSelectedUser(user);
    setOpenChat(true);
    // Fetch existing messages between user and selectedUser
    axios
      .get(
        `http://localhost:7000/messages?senderId=${user.id}&recipientId=${user.id}`
      )
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  if (!user || !user.id) {
    return null; // or redirect to login page if user not logged in
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Users</Typography>
      <Grid container spacing={3}>
        {allUsers.map((userItem) => (
          <Grid item key={userItem.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {userItem.firstName} {userItem.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {userItem.email}
                </Typography>
              </CardContent>
              <CardActions>
                {!userItem.requested && (
                  <Button
                    size="small"
                    onClick={() => handleFriendRequest(userItem.id)}
                  >
                    Send Friend Request
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={() => handleMessageButtonClick(userItem)}
                >
                  Send Message
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chat Dialog */}
      <Dialog open={openChat} onClose={() => setOpenChat(false)} fullWidth>
        <DialogTitle>
          Chat with {selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}
        </DialogTitle>
        <DialogContent>
          {messages.map((msg) => (
            <Typography key={msg.id} variant="body1">
              {msg.message}
            </Typography>
          ))}
          <TextField
            autoFocus
            margin="dense"
            id="messageContent"
            label="Message"
            fullWidth
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChat(false)}>Close</Button>
          <Button onClick={handleSendMessage} variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDashboard;
