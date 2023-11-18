import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import { appwrite } from './appwrite';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Aboutus from './pages/Aboutus';
import Features from './pages/Features';
import Support from './pages/Support';
import Pricing from './pages/Pricing';
import ChatPage from './pages/ChatPage';

export default function App() {
 

  return (
    <RecoilRoot>
      <BrowserRouter>
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Features" element={<Features />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/chat/:chatbotId" element={<ChatPage />} />
            
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </RecoilRoot>
  );
};
