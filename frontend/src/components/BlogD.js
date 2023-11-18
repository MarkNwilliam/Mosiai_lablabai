import React, { useState } from 'react';
import AnimatedPage from "../pages/AnimatedPage";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import { Button, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function BlogD() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postText, setPostText] = useState('');

  const handleEditorChange = (newEditorState) => {
    setPostText(newEditorState.getCurrentContent().getPlainText());
  };

  const handleResponseGeneration = () => {
    Swal.fire({
      title: 'Generating Blog Post',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    });

    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email

    fetch('https://pythonmosiai.azurewebsites.net/generate_blog_content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        description: `${title} - ${description}`
      })
    })
    .then(response => response.json())
    .then(data => {
      setPostText(data.content); // Use 'data.content' as per your FastAPI response
      Swal.close();
    })
    .catch(error => {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' });
    });
  };

  // Initialize editorState based on the postText
  const editorState = postText !== undefined && postText !== ''
    ? EditorState.createWithContent(ContentState.createFromText(postText))
    : EditorState.createEmpty();
  return (
    <AnimatedPage>
      <div className="max-w-3xl mx-auto">
        <div className="my-6">
          <h1 className="text-3xl font-bold mb-2">Generate a Blog Post</h1>
          <p className="text-gray-500">Enter a title, description and click Generate to see a blog post.</p>
        </div>
        <div className="my-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter blog post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Enter blog post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />

</div>
<div className="my-6">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleResponseGeneration}
      >
        Generate
      </button>
    </div>
  
    <div className="my-6">
      <Label for="postText">Blog Post:</Label>
      <Editor
        editorState={editorState}
        onEditorChange={handleEditorChange}
        initialValue={postText}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline'],
            className: 'text-gray-700',
            bold: { className: 'font-bold text-gray-700' },
            italic: { className: 'italic text-gray-700' },
            underline: { className: 'underline text-gray-700' },
          },
          blockType: {
            className: 'text-gray-700',
          },
          fontSize: {
            className: 'text-gray-700',
          },
          fontFamily: {
            className: 'text-gray-700',
          },
          list: {
            className: 'text-gray-700',
          },
          textAlign: {
            className: 'text-gray-700',
          },
          colorPicker: {
            className: 'text-gray-700',
          },
          link: {
            className: 'text-gray-700',
          },
          embedded: {
            className: 'text-gray-700',
          },
          image: {
            className: 'text-gray-700',
          },
          history: {
            className: 'text-gray-700',
          },
        }}
        toolbarClassName="text-gray-700"
        wrapperClassName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        editorClassName="text-gray-700"
      
      />
    </div>
  </div>
</AnimatedPage>

);
}
