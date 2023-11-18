import React, { useState } from 'react';

function AdContent() {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [fileName, setFileName] = useState('');

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(''); // clear the image

    try {
      const response = await fetch('https://mosiaibackend.azurewebsites.net/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: description
        })
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } else {
        throw new Error('Error generating picture');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateImage();
  };

  const handleFormatChange = (event) => {
    setDownloadFormat(event.target.value);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleDownloadClick = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${downloadFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    // Clean up the URL object to avoid memory leaks
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 px-4 max-w-md mx-auto space-y-3">
      <h2 className="text-2xl font-bold mb-3">Generate Image</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description" className="block mb-2 font-bold text-sm text-gray-700">
          Image Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="form-input block w-full py-2 px-3 text-gray-700 rounded-md shadow-sm"
          required
        />
        <div className="flex justify-between items-center">
          <div className="w-1/2 mr-2">
            <label htmlFor="format" className="block mb-2 font-bold text-sm text-gray-700">
              Download Format
            </label>
            <select
              id="format"
              name="format"
              value={downloadFormat}
              onChange={handleFormatChange}
              className="form-select block w-full py-2 px-3 text-gray-700 rounded-md shadow-sm"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="gif">GIF</option>
            </select>
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="filename" className="block mb-2 font-bold text-sm text-gray-700">
              File Name
            </label>
            <input
              id="filename"
              name="filename"
              type="text"
              value={fileName}
              onChange={handleFileNameChange}
              className="form-input block w-full py-2 px-3 text-gray-700 rounded-md shadow-sm"
           
              />
      </div>
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? 'Generating...' : 'Generate'}
    </button>
  </form>
  {error && (
    <div className="text-red-500 font-bold">{error}</div>
  )}
  {imageUrl && (
    <div>
      <img src={imageUrl} alt="Generated" className="my-4"/>
      <button
        onClick={handleDownloadClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download
      </button>
    </div>
  )}
</div>
);
}

export default AdContent;