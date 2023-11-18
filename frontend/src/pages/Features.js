import React from 'react'
import AnimatedPage from "./AnimatedPage";
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import BasicHeader from '../components/Basicheader';
import Footer from '../components/Footer'
import { analytics } from "../firebase";
import { useEffect } from "react";
import { logEvent } from 'firebase/analytics';

const features = 
[
  {
    name: 'AI-powered Customer Acquisition',
    description: 'Utilize advanced AI algorithms to identify and target potential customers, optimize marketing campaigns, and increase customer acquisition rates.',
    icon: CloudArrowUpIcon
  },
  {
    name: 'Financial Management Solutions',
    description: 'Streamline financial processes with AI-powered tools, automate accounting tasks, and gain insights for better financial decision-making.',
    icon: LockClosedIcon
  },
  {
    name: 'Legal Compliance Assistance',
    description: 'Receive AI-based solutions for navigating legal requirements, managing contracts, and ensuring regulatory compliance.',
    icon: ArrowPathIcon
  },
  {
    name: 'Personalized Support and Training',
    description: 'Get personalized guidance and training to effectively leverage AI technologies, address specific business challenges, and maximize the platform\'s features.',
    icon: FingerPrintIcon
  },
]


export default function Features() {

  useEffect(() => {
    logEvent(analytics, 'Features_page', { page_path: window.location.pathname });
}, []);

  
  return (
    <AnimatedPage>
 <BasicHeader/>
 <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
  <h2 className="text-base font-semibold leading-7 text-indigo-600">Accelerate your business operations</h2>
  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    Unlock the power of MosiAI
  </p>
  <p className="mt-6 text-lg leading-8 text-gray-600">
    Empower your business with MosiAI's advanced SaaS platform. Deploy your apps faster and more efficiently, giving your company a competitive edge in the market. With our cutting-edge AI technology and personalized support, you can drive growth and success like never before.
  </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

<Footer />
    </AnimatedPage>
  )
}
