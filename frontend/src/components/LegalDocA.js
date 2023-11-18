import React, { useState } from 'react';
import AnimatedPage from "../pages/AnimatedPage";
import { Button, Input, Label } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Swal from 'sweetalert2';


export default function LegalDocA() {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState("");
  const [description, setDescription] = useState("");
  const [isResponseAvailable, setIsResponseAvailable] = useState(false);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "eng"); // set the language to English
    formData.append("apikey", 'K85930001488957'); // replace with your own API key from OCR.space
    
    Swal.fire({
      title: 'Wait we are still extracting text',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    try{

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData,
      onprogress: (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      },
    });

    const result = await response.json();
    if (result && result.ParsedResults && result.ParsedResults.length > 0) {
      setText(result.ParsedResults[0].ParsedText);
      // Call API to generate response based on complaint and update response state
      Swal.close();
    }
  }
  catch(e){
    console.error(e.message);
    // Close loading box and show error message
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  
  }

  };


  const handleResponseGeneration = () => {
    Swal.fire({
        title: 'Analyzing Legal Document',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    const userEmail = localStorage.getItem('userEmail'); // Retrieve user email from storage

    fetch('https://pythonmosiai.azurewebsites.net/legal_doc_analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email: userEmail, 
            text: text, 
            description: description 
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Analysis response:", data.analysis); // Log the response
        setText(data.analysis); // Replace the extracted text with the analysis
        setResponse(''); // Clear the response if not needed
        setIsResponseAvailable(true);
        Swal.close();
    })
    .catch(error => {
        console.error(error);
        Swal.fire({ /* error handling */ });
    });
};

   
  
  return (
    <AnimatedPage>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Legal Document Analysis</h1>
<p class="text-lg text-gray-700 mb-8">Upload any pdf legal document and lets break out down for yu and remove the jargoon</p>

      <div className="flex flex-col items-center">
        <label htmlFor="pdfInput" className="text-xl mb-4">
          Select PDF file to extract text
        </label>
        <input 
          onChange={handleFileChange} 
          id="pdfInput" 
          name="file" 
          type="file" 
          accept="application/pdf" 
          className="py-2 px-4 border border-gray-400 rounded-md"
        />
        <div className="w-full mt-8">
          <label htmlFor="descriptionInput" className="text-xl mb-4">
            Enter a brief description of what you want the AI to do with the document:
          </label>
          <textarea
            id="descriptionInput"
            name="description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)} 
            value={description}
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
          ></textarea>
        </div>
        {progress > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <progress value={progress} max="100" />
            <p>{progress}% complete</p>
          </div>
        )}
     {text && (
    <div style={{ marginTop: "3rem" }}>
        <h2 className="text-2xl mb-4">
            {isResponseAvailable ? "Analysis Response:" : "Extracted Text:"}
        </h2>
        <p className="text-lg">{text}</p>
    </div>
)}

        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleResponseGeneration}
      >
        Analyse
      </button>
      </div>
    </AnimatedPage>
  );
}