import React, { useState, useEffect } from "react";
import Navbar from "../components/Header/Navbar";
import ChatAppVendor from "../components/Chat/DisplayChatVendor";

export default function ChatVendor() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [customer_id, setCustomerId]=useState("");
  useEffect(() => {
    const interval = setInterval(fetchChats, 5000);
    fetchChats();

    return () => clearInterval(interval);
  }, []);

  const fetchChats = async () => {
    try {
      localStorage.setItem('vendorID', "6613a7dc55dba4d67173b0da");
      const response = await fetch('/api/chat/vendorchats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vendorID: localStorage.getItem('vendorID') })
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
    setCustomerId(chat.customerID);
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
                  <h2 className="text-lg font-semibold">{chat.customerUsername}</h2>
                  <p className="text-gray-600">{chat.fromVendor ? 'You: ' : ''} {chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Chat Detail View --> */}
          <div className="w-3/4 flex flex-col overflow-y-auto">
            {selectedChat ? (
              <ChatAppVendor customerID={customer_id} />
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