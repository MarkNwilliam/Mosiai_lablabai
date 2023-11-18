import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import { Button, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useRecoilValue } from 'recoil';
import adFormDataAtom from '../atom/companydata';
import AnimatedPage from "../pages/AnimatedPage";
import FileSaver from 'file-saver';

const LegalDoc = () => {
  const [description, setDescription] = useState(() => {
    // Get the previous description from local storage if it exists
    const savedDescription = localStorage.getItem('description');
    return savedDescription ? savedDescription : "";
  });
  const [document, setDocument] = useState("");
  const [options, setOptions] = useState([]);
  // Use a function to get the initial state for response
  const [response, setResponse] = useState(() => {
    // Get the previous response from local storage if it exists
    const savedResponse = localStorage.getItem('response');
    return savedResponse ? savedResponse : "";
  });

   // useEffect that runs when response changes
   useEffect(() => {
    // Save the response to local storage whenever it changes
    localStorage.setItem('response', response);
  }, [response]);

  const formData = useRecoilValue(adFormDataAtom);

  // You can now access the values from the atom
  console.log(formData.companyName);
  console.log(formData.companyDescription);
  console.log(formData.productName);
  console.log(formData.productDescription);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    // Save the description to local storage
    localStorage.setItem('description', e.target.value);
  };

  const handleEditorChange = (content, editor) => {
    const newResponse = editorState.getCurrentContent().getPlainText();
    // Save the response to local storage
    localStorage.setItem('response', newResponse);
    setResponse(newResponse);
  };

  const handleClear = () => {
    // Clear the local storage
    localStorage.removeItem('description');
    localStorage.removeItem('response');

    // Clear the state
    setDescription('');
    setResponse('');
};

  const handleDownload = () => {
    const blob = new Blob([response], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'response.txt');
  };

  const handleResponseGeneration = () => {
    // Show loading box
    Swal.fire({
      title: 'Generating Response',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    const userEmail = localStorage.getItem('userEmail');
  
    // Call API to generate response based on complaint and update response state
    fetch('https://pythonmosiai.azurewebsites.net/legal_doc_generation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: userEmail,  // Assume userEmail is retrieved from a global state or context
        description: description,
        additionalInfo: `Company Name: ${formData.companyName}, Description: ${formData.companyDescription}`
      })
    })
    .then(response => response.json())
    .then(data => {
      setResponse(data.document);
      Swal.close();
    })
    .catch(error => {
      console.error(error);
      Swal.fire({ /* error handling */ });
    });
  };

  const editorState = EditorState.createWithContent(ContentState.createFromText(response));

  return (
    <AnimatedPage>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Legal Document Generator</h2>
      <p className="text-gray-600 mb-8">Enter a description of the legal document and generate the document below.</p>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1">
          <div className="mb-8">
            <Label htmlFor="description" className="text-gray-800 font-medium mb-2">Legal Document Description:</Label>
            <Input type="textarea" id="description" name="description" value={description} onChange={handleDescriptionChange} className="border border-gray-400 rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-blue-500" />
          </div>
          <Button onClick={handleResponseGeneration } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Legal Document</Button>
        </div>
        <div className="flex-1">
          <div className="mb-8">
            <Label htmlFor="document" className="text-gray-800 font-medium mb-2">Generated Legal Document:</Label>
            <Editor
              id="response"
              editorState={editorState}
              initialValue={response}
              onEditorChange={handleEditorChange}
              apiKey={process.env.REACT_APP_API_KEY_TINY}
              toolbarClassName="border border-gray-400 rounded-md p-2"
              wrapperClassName="border border-gray-400 rounded-md mb-8"
              editorClassName="px-4 py-2"
            />
          </div>
        </div>
      </div>
      <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Download Legal Document</Button>
      <Button onClick={handleClear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Clear All Data</Button>
    </div>
    </AnimatedPage>
  );
};

export default LegalDoc;