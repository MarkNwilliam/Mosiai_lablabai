import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import AnimatedPage from "../pages/AnimatedPage";
import { useNavigate } from 'react-router-dom'; 

const ChatbotCreator = () => {
  const [chatbotType, setChatbotType] = useState('');
  const [goals, setGoals] = useState('');
  const [description, setDescription] = useState('');
  const [chatbots, setChatbots] = useState([]); // New state for chatbots

  useEffect(() => {
    fetchChatbots();
  }, []);

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleViewChatbot = (chatbotId) => {
    // Navigate to the chat page for the selected chatbot
    navigate(`/chat/${chatbotId}`);
  };

  const handleDeleteChatbot = async (chatbotId) => {
    try {
      const response = await fetch(`https://pythonmosiai.azurewebsites.net/delete_chatbot/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: chatbotId })
      });

      if (response.ok) {
        Swal.fire(
          'Deleted!',
          'Your chatbot has been deleted.',
          'success'
        );
        fetchChatbots(); // Refresh chatbot list
      } else {
        throw new Error('Failed to delete chatbot');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      });
    }
  };

  const fetchChatbots = async () => {
    const userEmail = localStorage.getItem('userEmail');
    const response = await fetch(`https://pythonmosiai.azurewebsites.net/get_user_chatbots/?email=${userEmail}`);
    const data = await response.json();
    setChatbots(data);
  };


  const handleChatbotTypeChange = (event) => {
    setChatbotType(event.target.value);
  };

  const handleGoalsChange = (event) => {
    setGoals(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreateChatbot = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch('https://pythonmosiai.azurewebsites.net/create_chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: userEmail, 
          type: chatbotType, 
          goals: goals, 
          description: description 
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Swal.fire(
          'Success!',
          'Your chatbot has been created successfully.',
          'success'
        );
      } else {
        throw new Error('Failed to create chatbot');
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      });
    }
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto mt-10">
        <h2 className="text-center text-2xl font-bold mb-6">Create a Chatbot</h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chatbotType">
            Select Chatbot Type:
          </label>
          <select 
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="chatbotType" 
            value={chatbotType} 
            onChange={handleChatbotTypeChange}
          >
            <option value="">Select a Type</option>
            <option value="customer">Customer Q&A</option>
            <option value="sales">Sales Agent</option>
            <option value="employee">Employee Q&A</option>
            <option value="interview">Interview Agent</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goals">
            Chatbot Goals:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="goals"
            type="text"
            value={goals}
            onChange={handleGoalsChange}
            placeholder="Enter your chatbot's goals"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the purpose of your chatbot"
          />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleCreateChatbot} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Create Chatbot
          </button>
        </div>
      <h2 className="text-center text-2xl font-bold mb-6 mt-10">Manage Your Chatbots</h2>
        <div>
        {chatbots.map(chatbot => (
          <div key={chatbot.id} className="mb-4 p-4 border rounded shadow">
            <h3>{chatbot.type}</h3>
            <p>{chatbot.description}</p>
            <button 
              onClick={() => handleViewChatbot(chatbot.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              View
            </button>
            <button 
              onClick={() => handleDeleteChatbot(chatbot.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
      
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ChatbotCreator;