import React, { useState, useEffect } from "react";
import Navbar from "../../components/Header/Navbar";   
import ChatAppCustomer from "../../components/Chat/DisplayChatCustomer";

export default function ChatCustomer() {
  const customer_id = localStorage.getItem('userID');

  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [vendor_id, setVendorId] = useState("");
  useEffect(() => {
    const interval = setInterval(fetchChats, 5000);
    fetchChats();

    return () => clearInterval(interval);
  }, []);

  const fetchChats = async () => {
    try {
      localStorage.setItem('customerID', "6617bc2ecf757dfbbdaed2f8");
      const response = await fetch('http://localhost:4000/api/chat/customerchats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerID: localStorage.getItem('customerID') })
      });

      if (!response.ok) {
        setChats([]);
        throw new Error('Failed to fetch chats');
      }

      const data = await response.json();
      setChats(data);
    } catch (error) {
      setChats([]);
      console.error('Error fetching chats:', error);
    }
  }

  const selectChat = (chat) => {
    setSelectedChat(chat);
    setVendorId(chat.vendorID);
  };

  return (
    <>
      <div className="shadow-lg">
        <Navbar />

        {/* <!-- Chat List --> */}
        <div className="flex flex-row bg-white h-screen pt-12">

          {/* <!-- Vendor Chat List --> */}
          <div className="w-1/4 flex flex-col border-r border-gray-200 overflow-y-auto">
            <div className="bg-blue-600 text-white p-4 w-full">
              <h1 className="font-bold text-3xl">Chats</h1>
            </div>

            {chats.map((chat, index) => (
              <div key={index}
                className="flex flex-row items-center p-4 hover:bg-blue-100 cursor-pointer border-b border-gray-100"
                onClick={() => selectChat(chat)}>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{chat.vendorUsername}</h2>
                  <p className="text-gray-600">{chat.fromCustomer ? 'You: ' : ''}{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Chat Detail View --> */}
          <div className="w-3/4 flex flex-col overflow-y-auto">
            {selectedChat ? (
              <ChatAppCustomer vendorID={vendor_id} />
            ) : (
              <div className="p-4 mt-3">
                <div className="text-gray-800 text-xl font-semibold">Select a chat to view the conversation</div>
              </div>
            )}
          </div>
        </div>
      </div>

    </>

  )
};