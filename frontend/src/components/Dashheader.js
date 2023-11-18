import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

// Dashheader.js
const Dashheader = ({ isMenuOpen, setIsMenuOpen }) => {
  // Toggle menu function
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow py-3 px-6 z-50 relative">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center p-2 space-x-3 rounded-md"
          onClick={toggleMenu}  // Toggle menu when clicking the hamburger icon
        >
          ☰
        </button>
        <Link to="/" className="flex-grow text-center">
          <img src="/logo.png" alt="Logo" className="h-8 inline-block" />
        </Link>
        <Link to="/" className="flex items-center p-2 space-x-3 rounded-md">
          <BsFillArrowLeftCircleFill/>
        </Link>
      </div>
    </header>
  )
}

export default Dashheader;

