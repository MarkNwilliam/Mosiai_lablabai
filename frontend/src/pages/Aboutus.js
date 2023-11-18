import React from 'react'
import AnimatedPage from "./AnimatedPage";
import FaqsCard from "../components/Faq"
import Footer from "../components/Footer.js"
import BasicHeader from '../components/Basicheader';
import { logEvent } from 'firebase/analytics';

import { useEffect } from "react";

export default function Aboutus() {


  return (
    <AnimatedPage>
      <BasicHeader />
      <div style={{ margin: '200px 0' }}>
        <FaqsCard />
      </div>
      <Footer />
    </AnimatedPage>
  )
}
