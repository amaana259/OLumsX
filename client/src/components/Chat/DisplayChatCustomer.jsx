import React, { useState, useEffect } from "react";

export default function DisplayChatCustomer(props) {
  const customer_id = localStorage.getItem('userID') || "661575274bf91a5b120aaf42"
  const vendor_id = props.vendorID;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await fetchMessagesFromBackend(); // Call the backend function
      setMessages(response); // Set the messages received from the backend
    } catch (error) {
      setMessages([]);
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages from the server
  useEffect(() => {
    const fetchInterval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
    fetchMessages(); // Initial fetch
    return () => clearInterval(fetchInterval); // Cleanup
  }, []);

  const handleMessageSend = async () => {
    try {
      if (inputMessage.trim() === '') {
        return;
      }
      fetchMessages();
      const response = await fetch('http://localhost:4000/api/chat/createmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: customer_id,
          to: vendor_id,
          message: inputMessage
        }),
      });
      if (response.ok) {
        console.log('Message sent successfully!');
        setInputMessage(''); // Clear the input field upon successful message send
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessagesFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/chat/fetchmessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientID: customer_id,
          vendorID: vendor_id
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md flex flex-col min-h-screen w-full" style={{ minHeight: 'calc(100vh - 92px)' }}>
        {messages.length > 0 && (
          <div className="p-8 space-y-2 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${message.from.user_type === 'Customer' ? 'items-end' : 'items-start'}`}
              >
                <div className="py-1">
                  <div className="max-w-2/3 bg-blue-500 p-3 rounded-lg shadow mb-1">
                    <p className="text-slate-100 text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs text-gray-500">{message.from.username} at {message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="bg-gray-700 p-4 flex justify-between items-center sticky bottom-0 left-0 right-0">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMessageSend();
              e.preventDefault();
            }
          }}
        />
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          style={{ flexShrink: 0 }}
          onClick={handleMessageSend}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/filled-sent.png"
            alt="send"
            className="h-6 w-6"
          />
        </button>
      </div>
    </>

  );
}

