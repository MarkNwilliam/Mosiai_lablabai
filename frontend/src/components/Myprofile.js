import React, { useState, useEffect } from 'react';
import AnimatedPage from '../pages/AnimatedPage';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import adFormDataAtom from '../atom/companydata';
import Swal from 'sweetalert2';

export default function MyProfile() {
  const setFormData = useSetRecoilState(adFormDataAtom);
  const formData = useRecoilValue(adFormDataAtom);
  const [localFormData, setLocalFormData] = useState({
    _id: '',
    full_name: '',
    email: '',
    password: '',
    company_name: '',
    job_title: '',
    industry: '',
    country: '',
    phone_number: ''
  });

  const handleInputChange = (event) => {
    setLocalFormData({ ...localFormData, [event.target.name]: event.target.value });
  };

   // Function to fetch user data from the backend
   const fetchUserData = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      Swal.fire('Error', 'User email not found. Please log in again.', 'error');
      return;
    }

    try {
      const response = await fetch(`https://pythonmosiai.azurewebsites.net/get_user/?email=${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setLocalFormData(userData);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  // Call fetchUserData when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      Swal.fire('Error', 'User email not found. Please log in again.', 'error');
      return;
    }
  
    try {
      const response = await fetch(`https://pythonmosiai.azurewebsites.net/update_user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...localFormData, email: userEmail })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      Swal.fire('Success', 'Profile updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };
  

  // Additional UI elements for each field
  const renderInputField = (label, name, type = 'text', placeholder = '') => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={localFormData[name]}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        placeholder={placeholder}
      />
    </div>
  );

  return (
<AnimatedPage>
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">My Profile</h2>
        <form onSubmit={handleSubmit}>
          {renderInputField('Full Name', 'full_name')}
          {renderInputField('Email', 'email', 'email')}
          {renderInputField('Password', 'password', 'password')}
          {renderInputField('Company Name', 'company_name')}
          {renderInputField('Job Title', 'job_title')}
          {renderInputField('Industry', 'industry')}
          {renderInputField('Country', 'country')}
          {renderInputField('Phone Number', 'phone_number')}

          <button type="submit" className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Update Profile</button>
        </form>
      </div>
    </AnimatedPage>
  );
}