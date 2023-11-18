import React, { useState } from 'react';
import Papa from "papaparse";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

export default function AdContent() {
  // This state will store the parsed data
  const [data, setData] = useState([]);
  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");
  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError("");
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }
      // If input type is correct set the state
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");
    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();
    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      setData(parsedData);
      console.log(parsedData)
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="csvInput" className="block mt-4 font-bold text-xl">
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        id="csvInput"
        name="file"
        type="file"
        className="w-80 mt-2 p-2 border rounded"
      />
      <button
        onClick={handleParse}
        className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Parse
      </button>
      <div className="mt-8">
       
      </div>
    </div>
  );
}
