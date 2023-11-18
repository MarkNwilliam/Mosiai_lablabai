import React, { useState , useEffect} from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import Swal from 'sweetalert2';

const DropZone = ({ category, onDrop, documents, onDelete }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">{category} Documents</h3>
            <div {...getRootProps()} className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg h-40 w-full cursor-pointer mb-4 bg-white">
                <input {...getInputProps()} />
                <p className="text-gray-700 text-lg">Drag 'n' drop {category.toLowerCase()} files here, or click to select files</p>
            </div>
            <ul>
                {documents.map((doc, index) => (
                    <li key={index} className="border-b border-gray-200 py-2 flex justify-between items-center">
                        {doc.title}
                        <button onClick={() => onDelete(doc)} className="text-red-600 hover:text-red-800">
                            <AiOutlineClose size="20px" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const MyFile = () => {
    const [userEmail, setUserEmail] = useState('');
    const [documents, setDocuments] = useState([]);
    const categories = ['Q&A', 'Legal', 'Policies', 'Finance', 'General'];

    const extractText = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(e);
            reader.readAsText(file);
        });
    };

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserEmail(email);
        if(email) {
            fetchDocuments();
        }
    }, [userEmail]); 

    const fetchDocuments = async () => {

        if (!userEmail) {
            console.error('User email is not set');
            return;
        }

        try {
            console.log('User email:', userEmail);
            const response = await fetch(`https://pythonmosiai.azurewebsites.net/get_documents/${userEmail}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setDocuments(data.documents);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };
    

    const uploadDocument = async (userDocuments) => {
        try {
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait while the document is being uploaded',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
            });
    
            const response = await fetch('https://pythonmosiai.azurewebsites.net/upload_documents/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDocuments),
            });
    
            Swal.close(); // Close the loading Swal
    
            if (response.ok) {
                await fetchDocuments();
                Swal.fire({
                    title: 'Success!',
                    text: 'Document uploaded successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                throw new Error(`Failed to upload document: ${response.statusText}`);
            }
    
            return await response.json();
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to upload document',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error uploading document:', error);
        }
    };
    


    const handleDrop = (category) => async (acceptedFiles) => {
        for (const file of acceptedFiles) {
            const title = file.name;
            const snippet = await extractText(file); // Extract text from file
            setDocuments(prevDocs => [...prevDocs, { title, snippet, category }]);
        }
    };

    const handleDelete = async (docToDelete) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleting...',
                    text: 'Please wait while the document is being deleted',
                    allowOutsideClick: false,
                    willOpen: () => {
                        Swal.showLoading();
                    },
                });
    
                try {
                    const response = await fetch('https://pythonmosiai.azurewebsites.net/delete_document/', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: userEmail, document_title: docToDelete.title , category: docToDelete.category })
                    });
    
                    Swal.close(); // Close the loading Swal
    
                    if (!response.ok) {
                        throw new Error('Failed to delete document');
                    }
    
                    setDocuments(documents.filter(doc => doc.title !== docToDelete.title));
                    await fetchDocuments();
    
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete document',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    console.error('Error deleting document:', error);
                }
            }
        });
    };
    

    


  
    

    const handleSubmit = async () => {
        const userDocuments = { email: userEmail, documents: documents };
        await uploadDocument(userDocuments);
        setDocuments([]); // Clear documents after upload
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Files</h1>
            {categories.map(category => (
                <DropZone
                    key={category}
                    category={category}
                    onDrop={handleDrop(category.toLowerCase())}
                    documents={documents.filter(doc => doc.category.toLowerCase() === category.toLowerCase())}
                    onDelete={handleDelete}
                />
            ))}
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Submit All Documents
            </button>
        </div>
    );
    
};

export default MyFile;
