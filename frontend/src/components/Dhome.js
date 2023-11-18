import React, { useState , useEffect} from 'react';
import AnimatedPage from '../pages/AnimatedPage';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
import adFormDataAtom from '../atom/companydata';
import Swal from 'sweetalert2';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdContent() {
  const setFormData = useSetRecoilState(adFormDataAtom);
  const formData = useRecoilValue(adFormDataAtom);




  const [localFormData, setLocalFormData] = useState(() => {
    let initialData = {
      companyName: '',
      companyDescription: '',
      products: [{
        productName: '',
        productDescription: '',
        industry: '' 
      }]
    };
  
    if (formData && Array.isArray(formData.products)) {
      initialData = formData;
    }
  
    return initialData;
  });
  

  const handleInputChange = (event) => {

    setLocalFormData({
      ...localFormData,
      [event.target.name]: event.target.value
    });
  };


  // Example function to fetch company data
const fetchCompanyData = async () => {
  const userEmail = localStorage.getItem('userEmail');
  console.log("User email:", userEmail);
  if (!userEmail) {
    // Handle no email found
    return;
  }

  const response = await fetch(`https://pythonmosiai.azurewebsites.net/get_company/?email=${userEmail}`);
  if (!response.ok) {
    // Handle error
    return;
  }

  const data = await response.json();
  setLocalFormData(data); // Update your local form state
};


  const handleProductChange = (event, index) => {
    const updatedProducts = [...localFormData.products];
    updatedProducts[index][event.target.name] = event.target.value;
    setLocalFormData({
      ...localFormData,
      products: updatedProducts
    });
  };

  const addProduct = () => {
    setLocalFormData({
      ...localFormData,
      products: [...localFormData.products, {
        productName: '',
        productDescription: ''
      }]
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...localFormData.products];
    updatedProducts.splice(index, 1);
    setLocalFormData({
      ...localFormData,
      products: updatedProducts
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    // Start the progress bar
    const progressBar = Swal.fire({
      title: 'Loading...',
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Retrieve the user's email from localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.log(userEmail)
      throw new Error('User email not found. Please log in again.');
    }

    // Prepare the data to be sent
    const dataToSend = {
      ...localFormData,
      email: userEmail, // Include the user's email in the data
    };

    // Send the data to the backend
    const response = await fetch('https://pythonmosiai.azurewebsites.net/my_company/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to submit company data');
    }

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Form submitted successfully',
      showConfirmButton: false,
      timer: 1500
    });

    // Close the progress bar
    progressBar.close();
  } catch (error) {
    console.error('Error submitting form:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error submitting form',
      text: error.message
    });
  }
};

 // Fetch company data on component mount
 useEffect(() => {
  fetchCompanyData();
}, []); // Empty dependency array ensures this runs once on mount
  

  return (
    <AnimatedPage>
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Tell us about your company and product</h2>
          <p className="text-gray-500 text-lg">
            We use this information to tailor our features and produce the best results for you.
          </p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              className="border border-gray-400 py-2 px-3 rounded-lg"
              type="text"
              id="companyName"
              name="companyName"
              value={localFormData.companyName}
              onChange={handleInputChange}
              placeholder={formData ? '' : 'Enter company name'}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-gray-700 font-bold mb-2" htmlFor="companyDescription">
              Company Description
            </label>
            <textarea
              className="border border-gray-400 py-2 px-3 rounded-lg h-24 resize-none"
              id="companyDescription"
              name="companyDescription"
              value={localFormData.companyDescription}
              onChange={handleInputChange}
              placeholder={formData ? '' : 'Enter company description'}
            />
          </div>
          <AnimatePresence>
          {localFormData.products.map((product, index) => (
           <motion.div 
           key={index}
           initial={{ opacity: 0, y: -50 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 50 }}
         >
           <div className="flex flex-col mb-4">
             <label className="text-gray-700 font-bold mb-2" htmlFor={`productName-${index}`}>
               Product Name
             </label>
             <input
               className="border border-gray-400 py-2 px-3 rounded-lg"
               type="text"
               id={`productName-${index}`}
               name="productName"
               value={product.productName}
               onChange={(event) => handleProductChange(event, index)}
               placeholder={formData ? '' : 'Enter product name'}
             />
           </div>
           <div className="flex flex-col mb-4">
             <label className="text-gray-700 font-bold mb-2" htmlFor={`productDescription-${index}`}>
               Product Description
             </label>
             <textarea
               className="border border-gray-400 py-2 px-3 rounded-lg h-24 resize-none"
               id={`productDescription-${index}`}
               name="productDescription"
               value={product.productDescription}
               onChange={(event) => handleProductChange(event, index)}
               placeholder={formData ? '' : 'Enter product description'}
             />
           </div>
           <div className="flex flex-col mb-4">
             <label className="text-gray-700 font-bold mb-2" htmlFor={`productIndustry-${index}`}>
               Product Industry
             </label>
             <input
               className="border border-gray-400 py-2 px-3 rounded-lg"
               type="text"
               id={`productIndustry-${index}`}
               name="industry" // Make sure the name attribute matches the state variable
               value={product.industry}
               onChange={(event) => handleProductChange(event, index)}
               placeholder={formData ? '' : 'Enter product industry'}
             />
           </div>
           <motion.button 
             type="button" 
             onClick={() => removeProduct(index)}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
           >
             Remove Product
           </motion.button>
         </motion.div>
         
          ))}
</AnimatePresence>
<motion.button 
            type="button"
            onClick={addProduct}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Add Product
          </motion.button>
          <div className="text-center">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mb-10"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AnimatedPage>
  );
}
