import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ChatPage = () => {
    const { chatbotId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sessionId, setSessionId] = useState(null); // Store the session ID
  
    useEffect(() => {
      startChatSession(chatbotId);
    }, [chatbotId]);
  
    const startChatSession = async (chatbotId) => {

        console.log(chatbotId)
        try {

         // Show loading indicator
         Swal.fire({
            title: 'Sending message...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
          const response = await fetch(`https://pythonmosiai.azurewebsites.net/start_chat_session/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatbot_id: chatbotId }) // Ensure this matches the backend's expected format
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          Swal.close();

          setSessionId(data.session_id);
        } catch (error) {
          console.error('Error starting chat session:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Could not send the message try to refreash the page please',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        }
      };
      
  
    const handleSend = async () => {
      if (!newMessage.trim()) return;
  
      // Send newMessage to the chatbot
      const messagePayload = {
        session_id: sessionId,
        user_name: "User",
        text: newMessage,
        timestamp: new Date().toISOString() // Format the date to match the backend expectation
    };
      try {

        // Show loading indicator
        Swal.fire({
            title: 'Sending message...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const response = await fetch(`https://pythonmosiai.azurewebsites.net/send_chat_message/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messagePayload)
        });
        const data = await response.json();
        Swal.close();
            if (data.response) {
                // Update messages with user's message and chatbot's response
                setMessages([...messages, messagePayload, { user_name: "Chatbot", text: data.response }]);
            }
            setNewMessage('');
        // Fetch the chatbot's response and update messages (if applicable)

      } catch (error) {
        console.error('Error sending message:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Could not send the message try to refreash the page please',
            icon: 'error',
            confirmButtonText: 'OK'
        });
      }
    };

  return (
    <div className="flex flex-col h-screen p-4">
    <div className="flex flex-col overflow-y-auto mb-4">
        {messages.map((message, index) => (
            <div key={index} className={`m-2 p-2 rounded-lg text-white ${message.user_name === 'User' ? 'bg-blue-500 self-end' : 'bg-gray-500 self-start'}`}>
                {message.text}
            </div>
        ))}
    </div>
    <div className="flex">
        <input 
            type="text" 
            className="flex-grow p-2 border rounded-l-lg focus:outline-none"
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Type a message..."
        />
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-lg"
            onClick={handleSend}
        >
            Send
        </button>
    </div>
</div>
);
};

export default ChatPage;