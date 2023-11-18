import React, { useState } from 'react'
import { AiOutlineFile, AiOutlineFileSearch } from 'react-icons/ai';
import BlogGeneration from '../components/BlogGeneration'
import "../css/dashboard.css"
import { BiBarChart } from 'react-icons/bi';

import AdContent from '../components/AdContent'
import Dashheader from '../components/Dashheader'
import Dhome from '../components/Dhome'
import ImageG from '../components/ImageG'
import LegalDoc from '../components/LegalDoc'
import LegalDocA from '../components/LegalDocA'
import FaceD from '../components/FaceD'
import LinkD from '../components/LinkD'
import MyFile from '../components/Myfiles'
import TwitterD from '../components/TwitterD'
import InstaD from '../components/InstaD'
import CustomerD from '../components/CustomerD'
import MyProfile from '../components/Myprofile'
import EmailD from '../components/EmailD'
import BlogD from '../components/BlogD'
import FeedbackD from '../components/FeedbackD'
import DocumentD from '../components/DocumentD'
import FinancieD from '../components/FinancieD'
import DataAnalysis from '../components/Data_analysis'
import ResponseD from '../components/ResponseD'
import { AiOutlineUser, AiOutlineDollarCircle, AiOutlineFileText, AiOutlineMessage } from 'react-icons/ai';
import { analytics } from "../firebase";
import { useEffect } from "react";
import CustomerQuestions from '../components/CustomerQuestions'
import AnimatedPage from "./AnimatedPage";
import { BsFillPencilFill } from "react-icons/bs";
import { BsEnvelopePaperFill } from "react-icons/bs";
import { SiHomeadvisor } from "react-icons/si";
import { SiTwitter,SiLetterboxd,SiMobx,SiReadthedocs } from 'react-icons/si';
import { SiBloglovin } from 'react-icons/si';
import { MdFeedback,MdOutlineMonetizationOn } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { SiGmail } from 'react-icons/si';
import { SiIpfs ,SiLinkedin} from "react-icons/si";
import { SiInstagram, SiFacebook } from 'react-icons/si';
import { BsFileImage } from "react-icons/bs";
import { IoIosBusiness, IoIosFolderOpen, IoIosStats } from 'react-icons/io';
import { logEvent } from 'firebase/analytics';


function Dashboard() {
  
  const [currentSection, setCurrentSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    logEvent(analytics, 'Dashboard_page', { page_path: window.location.pathname });
}, []);
  
  function handleNavigation(section) {
    setCurrentSection(section);
    setIsMenuOpen(false); // close the drawer after navigating
  }

  const sections = [
    { 
      id: 'myCompany', 
      name: 'My Company', 
      features: [
        { id: 'home', name: 'My Company', icon: <IoIosBusiness size={24}/> },
        { id: 'My files', name: 'My Files', icon: <IoIosFolderOpen size={24}/> },
        { id: 'My Profile', name: 'My Profile', icon: <IoIosStats size={24}/> },
      ],
    },
    { 
      id: 'analysisTools', 
      name: 'Analysis Tools', 
      features: [ 
        { id: 'Customer analysis', name: 'Customer Analysis', icon: <AiOutlineUser size={24}/> },
        { id: 'Financial analysis', name: 'Financial Analysis', icon: <AiOutlineDollarCircle size={24}/> },
        { id: 'Document management', name: 'Document Analysis', icon: <AiOutlineFileText size={24}/> },
        { id: 'Feedback management', name: 'Feedback Analysis', icon: <AiOutlineMessage size={24}/> },
      ],
    },
    { 
      id: 'legalTools', 
      name: 'Legal Tools', 
      features: [
        { id: 'legalDoc', name: 'Legal Doc Generator', icon: <AiOutlineFile size={24}/> },
        { id: 'legalDocA', name: 'Legal Doc Analysis', icon: <AiOutlineFileSearch size={24}/> },
      ],
    },
    { 
      id: 'marketingTools', 
      name: 'Marketing Tools', 
      features: [
        { id: 'content', name: 'Create a Chatbot', icon: <SiIpfs/> },
        { id: 'Email management', name: 'Email Content', icon: <BsEnvelopePaperFill /> },
        { id: 'Blog management', name: 'Blog Writer', icon: <SiBloglovin /> },
        { id: 'twitter', name: 'Twitter Content', icon: <SiTwitter /> },
        { id: 'instagram', name: 'Instagram Content', icon: <SiInstagram /> },
        { id: 'Link management', name: 'LinkedIn Content', icon: <SiLinkedin/> },
        { id: 'Face recognition', name: 'Facebook Content', icon: <SiFacebook /> },
      ],
    },
  ];
  
  
  const [searchTerm, setSearchTerm] = useState('');  // New State for Search Term

 

  const closeMenu = () => setIsMenuOpen(false);
  return (
    <div>
<AnimatedPage>

<div 
          className={`fixed inset-0 z-40 w-full h-full transition-opacity ease-out duration-500 bg-black/50 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeMenu} // Close menu when clicking outside
        ></div>

    <Dashheader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

    <div className="flex">
 
    <div className={`fixed z-50 flex flex-col h-full p-3 bg-white shadow w-80 transition-transform ease-out duration-500 transform overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ height: "calc(100vh - 28px)", overflowY: "auto" }}>

<div className="space-y-3">
<div className="flex flex-col">
  <h2 className="text-xl font-bold mb-4">Dashboard</h2>
    {/* New Search Bar */}
{/* New Search Bar */}
<div className="relative">
    <input
      type="text"
      value={searchTerm}
      onChange={event => setSearchTerm(event.target.value)}
      className="w-full px-4 py-2 mt-2 text-sm leading-tight text-gray-700 bg-white border border-gray-400 rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
      placeholder="Search..."
    />
    <div className="absolute top-0 right-0 mt-3 mr-3 text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => setSearchTerm('')}
      >
        <path
          fillRule="evenodd"
          d="M10 19a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 100-14 7 7 0 000 14zm1.707-6.293a1 1 0 01-1.414 1.414L10 10.414l-1.293 1.293a1 1 0 11-1.414-1.414L8.586 9l-1.293-1.293a1 1 0 011.414-1.414L10 7.586l1.293-1.293a1 1 0 111.414 1.414L11.414 9l1.293 1.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>


<hr className="my-4"/>

    
  </div>
  <div className="flex-1">

  {sections
  .filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map(filteredSection => (
    <div key={filteredSection.id}>
      <h3 className="py-2 font-bold">{filteredSection.name}</h3>
      <ul className="pt-2 pb-4 space-y-1 text-sm">
        {filteredSection.features
          .filter(feature =>
            feature.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(filteredFeature => (
            <li key={filteredFeature.id} className="rounded-sm">
              <button
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-200"
                onClick={() => handleNavigation(filteredFeature.id)}
              >
                {filteredFeature.icon}
                <span>{filteredFeature.name}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  ))}


    

  </div>
</div>
</div>

   
      <div className={`flex-1 transition-margin ease-out duration-500 ${isMenuOpen ? 'ml-80' : 'ml-0'}`}>

        {currentSection === 'home' && <Dhome />}
        
        {currentSection === 'content' && <AdContent />}
        {currentSection === 'image' && <ImageG />}
       

        {currentSection === 'Customer analysis' && <CustomerD />}
{currentSection === 'Financial analysis' && <FinancieD />}
{currentSection === 'Response management' && <ResponseD />}
{currentSection === 'Document management' && <DocumentD />}
{currentSection === 'Feedback management' && <FeedbackD />}
{currentSection === 'Blog management' && <BlogD />}
{currentSection === 'Email management' && <EmailD />}
{currentSection === 'twitter' &&  <TwitterD />}
{currentSection === 'My Profile' &&  <MyProfile />}
{currentSection === 'instagram' &&   <InstaD />}
{currentSection === 'Link management' && <LinkD />}
{currentSection === 'Face recognition' && <FaceD />}
{currentSection === 'legalDoc' && <LegalDoc />}
{currentSection === 'legalDocA' && <LegalDocA />}
{currentSection === 'My files' && <MyFile />}


        
      </div>
    </div>



    </AnimatedPage>

    </div>
  )
}

export default Dashboard




