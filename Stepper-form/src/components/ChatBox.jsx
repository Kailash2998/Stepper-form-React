import React from 'react';

const ChatBox = ({ user, recipientId, messageContent, setMessageContent, onSendMessage }) => {
  const handleMessageSend = () => {
    onSendMessage(recipientId, messageContent);
  };

  return (
    <div className="chat-box">
      <h3>Chat with {recipientId}</h3>
      <div className="message-container">
        {/* Display messages */}
        {/* You can map through messages and display them here */}
      </div>
      <textarea
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default ChatBox;
