import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import { Button, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ResponseGenerator = () => {
  const [complaint, setComplaint] = useState("");
  const [response, setResponse] = useState("");

  const handleComplaintChange = (e) => {
    setComplaint(e.target.value);
  };

  const handleEditorChange = (content, editor) => {
      setResponse(editorState.getCurrentContent().getPlainText());
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
  
    // Call API to generate response based on complaint and update response state
    fetch('https://mosiaibackend.azurewebsites.net/customer_response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: complaint })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResponse(data.answer);
      // Close loading box
      Swal.close();
    })
    .catch(error => {
      console.error(error);
      // Close loading box and show error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    });
  };

  const editorState = EditorState.createWithContent(ContentState.createFromText(response));

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Customer Response Generator</h2>
      <p className="text-gray-600 mb-8">Enter a customer complaint and generate a response email below.</p>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1">
          <div className="mb-8">
            <Label htmlFor="complaint" className="text-gray-800 font-medium mb-2">Customer Complaint:</Label>
            <Input type="textarea" id="complaint" name="complaint" value={complaint} onChange={handleComplaintChange} className="border border-gray-400 rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-blue-500" />
          </div>
          <Button onClick={handleResponseGeneration} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate Response Email</Button>
        </div>
        <div className="flex-1">
          <div className="mb-8">
            <Label htmlFor="response" className="text-gray-800 font-medium mb-2">Generated Response:</Label>
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
    </div>
  );
};

export default ResponseGenerator;
