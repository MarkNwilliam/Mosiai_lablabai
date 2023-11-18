import React, { useState } from 'react';
import AnimatedPage from "../pages/AnimatedPage";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import { Button, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useRecoilValue } from 'recoil';
import adFormDataAtom from '../atom/companydata';

export default function InstaD() {
  const [description, setDescription] = useState('');
  const [response, setResponse] = useState('');

  const formData = useRecoilValue(adFormDataAtom);

  const handleResponseGeneration = () => {
    Swal.fire({
      title: 'Generating Instagram Content',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    });

    const userEmail = localStorage.getItem('userEmail');

    fetch('https://pythonmosiai.azurewebsites.net/generate_social_media_content/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        type: 'instagram',
        prompt: description,
      })
    })
    .then(response => response.json())
    .then(data => {
      setResponse(data.content);
      Swal.close();
    })
    .catch(error => {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    });
  };

  // Initialize editorState based on the response
  const editorState = response 
    ? EditorState.createWithContent(ContentState.createFromText(response))
    : EditorState.createEmpty();

  return (
    <AnimatedPage>
      <div className="mx-auto max-w-lg">
        <h1 className="text-4xl text-center mb-4">Instagram Content Generator</h1>
        <div className="mb-4">
          <Label htmlFor="description" className="mb-2">Instagram Post Description</Label>
          <textarea id="description" className="border p-2 h-24 w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={handleResponseGeneration}>Generate Content</Button>
        <div>
          <Label htmlFor="response" className="mb-2">Generated Content</Label>
          <Editor
            editorState={editorState}
            toolbarClassName="border border-gray-400 rounded-md p-2"
            wrapperClassName="border border-gray-400 rounded-md"
            editorClassName="px-4 py-2"
          />
        </div>
      </div>
    </AnimatedPage>
  );
}
