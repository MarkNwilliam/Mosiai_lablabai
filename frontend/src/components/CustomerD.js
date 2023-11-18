import React, { useState } from 'react';
import AnimatedPage from "../pages/AnimatedPage";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Input, Label } from 'reactstrap';
import { useRecoilValue } from 'recoil';
import adFormDataAtom from '../atom/companydata';

export default function CustomerD() {
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [csvData, setCsvData] = useState(null);

  const formData = useRecoilValue(adFormDataAtom);

  // You can now access the values from the atom
  console.log(formData.companyName);
  console.log(formData.companyDescription);
  console.log(formData.productName);
  console.log(formData.productDescription);


  const handleEditorChange = (content, editor) => {
    setResult(editorState.getCurrentContent().getPlainText());
};

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target.result;
      let csvData;

      if (file.type === "text/csv") {
        csvData = data;
      } else if (file.type.includes("sheet")) {
        // convert excel file to csv using xlsx library
        const workbook = XLSX.read(data, { type: "binary" });
        csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
      } else {
        alert("Unsupported file format!");
        return;
      }

      setCsvData(csvData);
      console.log(csvData);
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

 
  const handleSendData = async () => {
    if (!csvData) {
      alert("Please select a file first!");
      return;
    }
  
    // Show loading box
    Swal.fire({
      title: 'Generating Report',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    
  
    try {
      const response = await fetch("https://pythonmosiai.azurewebsites.net/customer_analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: csvData
        }),
        onprogress: (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        },
      });
  
      const result = await response.json();
      setResult(result.analysis);
      Swal.close();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };
  

  
  const handleDownloadReport = () => {
    if (!result) {
      alert("Please generate a report first!");
      return;
    }
  
  };
  
  const editorState = EditorState.createWithContent(
    ContentState.createFromText(result?.toString() || '')
  );

  return (
    <AnimatedPage>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Customer Data analysis</h1>
<p class="text-lg text-gray-700 mb-8">Lets analyse your customer data just upload your csv file and lets do the hard work</p>

      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <label htmlFor="csvInput" className="block text-lg font-medium text-gray-700">
          Select CSV or Excel file to process
        </label>
        <div className="mt-2 flex flex-col items-center justify-center sm:flex-row sm:justify-start sm:space-x-4">
          <input onChange={handleFileChange} id="csvInput" name="file" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="block w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
          <button onClick={handleSendData} className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto">
            Send Data
          </button>
        </div>
        {progress > 0 && (
          <div className="mt-4 w-full">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between text-xs font-semibold">
                <div className="text-gray-600">Progress</div>
                <div className="text-gray-600">{progress}%</div>
             
                </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
          </div>
        </div>
      
    )}
    {result && (
      <div className="mt-6 w-full">
       <div className="flex-1">
          <div className="mb-8">
            <Label htmlFor="response" className="text-gray-800 font-medium mb-2">Generated Report:</Label>
            <Editor
              id="response"
              editorState={editorState}
              initialValue={result}
              onEditorChange={handleEditorChange}
              apiKey={process.env.REACT_APP_API_KEY_TINY}
              toolbarClassName="border border-gray-400 rounded-md p-2"
              wrapperClassName="border border-gray-400 rounded-md mb-8"
              editorClassName="px-4 py-2"
            />
          </div>
        </div>
        <button onClick={handleDownloadReport } className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto">
            Download
          </button>
      </div>
    )}
  </div>
</AnimatedPage>
);
}