import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftSquare } from "react-icons/bs";

function BasicHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-white fixed top-0 w-full"> {/* Added additional classes */}
      <Link to="/">
        <img src="logo.png" alt="Logo" className="h-8 w-auto" />
      </Link>
      <div>
        <BsArrowLeftSquare className="h-6 w-6 text-gray-500" onClick={() => window.history.back()} />
      </div>
    </div>
  );
}

export default BasicHeader;


