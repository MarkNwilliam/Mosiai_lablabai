import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { account } from '../appwrite'; 
import AnimatedPage from './AnimatedPage';
import Basicheader from '../components/Basicheader';
import { analytics } from "../firebase";
import { useEffect } from "react";
import { logEvent } from 'firebase/analytics';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    logEvent(analytics, 'Login_page', { page_path: window.location.pathname });
}, []);
  

const handleLogin = async (e) => {
  e.preventDefault();

  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  try {
    const response = await fetch('https://pythonmosiai.azurewebsites.net/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to login');
    }

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'You have been logged in successfully!',
      confirmButtonText: 'Continue',
    }).then(() => {
      localStorage.setItem('userEmail', email)
      console.log(email)
    
      navigate('/dashboard'); // Adjust this to the correct dashboard route
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
      confirmButtonText: 'OK',
    });
  }
};



  return (
    <AnimatedPage>
      <Basicheader />

      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <h2 className="text-3xl font-bold text-white mb-4">Login</h2>
        <form className="bg-white p-8 rounded shadow" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="text-white mt-4">
          Don't have an account?{' '}
          <Link className="text-blue-300 hover:text-blue-200" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </AnimatedPage>
  );
}
