import React, { useState } from 'react';
import AnimatedPage from "../pages/AnimatedPage";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState , convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Input, Label } from 'reactstrap';

export default function FinanceD() {
  const [progress, setProgress] = useState(0);
  const [csvData, setCsvData] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
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

    Swal.fire({
      title: 'Generating Report',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });

    try {
      const response = await fetch("https://pythonmosiai.azurewebsites.net/financial_analysis", {
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
      console.log('API Response:', result);
      const content = ContentState.createFromText(result.analysis);
      const newEditorState = EditorState.createWithContent(content);
      setEditorState(newEditorState);
      Swal.close();
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later. ' +error ,
      });
    }
  };

  const handleDownloadReport = () => {
    const content = convertToRaw(editorState.getCurrentContent());
    const text = content.blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');

    if (!text) {
      alert("Please generate a report first!");
      return;
    }

    Swal.fire({
      title: 'Enter Document Name',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Download',
      showLoaderOnConfirm: true,
      preConfirm: (docName) => {
        return new Promise((resolve) => {
          const file = new Blob([text], { type: 'text/plain' });
          saveAs(file, `${docName}.doc`);
          resolve();
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isDismissed) {
        // Handle cancel button clicked
      }
    });
  };

  const handleClearEditor = () => {
    setEditorState(EditorState.createEmpty());
    setCsvData(null);
  };

  return (
    <AnimatedPage>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Financial Analysis</h1>
      <p className="text-lg text-gray-700 mb-8">Upload your CSV of your balance sheet or any other financial document and get professional analysis</p>

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
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 w-full">
          <div className="flex-1">
            <div className="mb-8">
              <Label htmlFor="response" className="text-gray-800 font-medium mb-2">Generated Response:</Label>
              <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
            </div>
          </div>
          <button onClick={handleDownloadReport} className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto">
            Download Report
          </button>
          <button onClick={handleClearEditor} className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto">
            Clear Editor
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
}
