import React, { useState } from 'react';
import Footer from '../components/Footer'
import BasicHeader from '../components/Basicheader';
import AnimatedPage from './AnimatedPage';
import { useEffect } from "react";
import { logEvent } from 'firebase/analytics';

const Pricing = () => {
    const checkIcon = <svg className="w-5 h-5 mx-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" /></svg>
    const minusIcon = <svg className="w-5 h-5 mx-auto text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" /></svg>

    const plans = [
        {
            name: "Basic plan",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 12,
            isMostPop: false,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",

            ],
        },
        {
            name: "Startup",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 35,
            isMostPop: true,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
        {
            name: "Enterprise",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 60,
            isMostPop: false,
            features: [
                "Curabitur faucibus",
                "massa ut pretium maximus",
                "Sed posuere nisi",
                "Pellentesque eu nibh et neque",
                "Suspendisse a leo",
                "Praesent quis venenatis ipsum",
                "Duis non diam vel tortor",
            ],
        },
    ];


    const tables = [
        {
            label: "Features",
            label_icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>,
            items: [
                {
                    name: "Aliquam finibus",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Vestibulum tristique",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Aliquam finibus",
                    basic: minusIcon,
                    business: minusIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Praesent aliquet",
                    basic: minusIcon,
                    business: "150GB",
                    enterprise: "Unlimited"
                },
            ]
        },
        {
            label: "Analytics",
            label_icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>,
            items: [
                {
                    name: "Aliquam finibus",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Vestibulum tristique",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Aliquam finibus",
                    basic: minusIcon,
                    business: minusIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Lorinto dinor",
                    basic: "30",
                    business: "60",
                    enterprise: "Custom"
                },
                {
                    name: "Praesent aliquet",
                    basic: "Limited",
                    business: "Limited",
                    enterprise: checkIcon
                },
                {
                    name: "Praesent aliquet",
                    basic: minusIcon,
                    business: "150GB",
                    enterprise: "Unlimited"
                },
            ]
        },
        {
            label: "Support",
            label_icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>,
            items: [
                {
                    name: "Aliquam finibus",
                    basic: checkIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Vestibulum tristique",
                    basic: minusIcon,
                    business: checkIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Aliquam finibus",
                    basic: minusIcon,
                    business: minusIcon,
                    enterprise: checkIcon
                },
                {
                    name: "Praesent aliquet",
                    basic: minusIcon,
                    business: "150GB",
                    enterprise: "Unlimited"
                },
            ]
        }
    ]

    const [selectedPlan, setSelectedPlan] = useState(plans[0].name)



    return (

        <AnimatedPage>
            <BasicHeader />
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                        Pricing for all sizes
                    </h3>
                    <div className='mt-3 max-w-xl'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
                        </p>
                    </div>
                </div>
                <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {
                                    item.isMostPop ? (
                                        <span class="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">Most popular</span>
                                    ) : ""
                                }
                                <div className="p-8 space-y-4 border-b">
                                    <span className='text-indigo-600 font-medium'>
                                        {item.name}
                                    </span>
                                    <div className='text-gray-800 text-3xl font-semibold'>
                                        ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
                                    </div>
                                    <p>
                                        {item.desc}
                                    </p>
                                    <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                                        Get Started
                                    </button>
                                </div>
                                <ul className='p-8 space-y-3'>
                                    <li className="pb-2 text-gray-800 font-medium">
                                        <p>Features</p>
                                    </li>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex items-center gap-5'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className='h-5 w-5 text-indigo-600'
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'>
                                                    <path
                                                        fill-rule='evenodd'
                                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                        clip-rule='evenodd'></path>
                                                </svg>
                                                {featureItem}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>


            <section className="py-14 text-gray-600">
            <div className="">
                <div className='relative max-w-xl mx-auto space-y-3 px-4 sm:text-center md:px-0'>
                    <h3 className="text-indigo-600 font-semibold">
                        Pricing
                    </h3>
                    <p className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                        Compare our plans and find yours
                    </p>
                    <div className='max-w-xl'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
                        </p>
                    </div>
                </div>
                <div className="mt-16">
                    <div className="sticky top-0 py-6 border-b bg-white">
                        <div className="max-w-screen-xl mx-auto">
                            <ul className="ml-auto flex gap-x-6 px-4 md:px-8 lg:max-w-3xl">
                                {
                                    plans.map((item, idx) => (
                                        <li key={idx} className={`space-y-4 w-full ${item.name != selectedPlan ? "hidden lg:block" : ""}`}>
                                            <div className="flex items-center justify-between">
                                                <span className='text-gray-700 font-medium'>
                                                    {item.name}
                                                </span>
                                                <div className="relative lg:hidden">
                                                    <svg className="w-5 h-5 text-gray-500 absolute right-0 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                                    </svg>
                                                    <select value="Switch plan" className="bg-transparent appearance-none outline-none px-8 cursor-pointer"
                                                        onChange={(e) => setSelectedPlan(e.target.value)}
                                                    >
                                                        <option disabled selected>Switch plan</option>
                                                        {plans.map((option, idx) => (
                                                            <option key={idx}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='text-gray-800 text-3xl font-semibold'>
                                                ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
                                            </div>
                                            <p className="text-sm">
                                                {item.desc}
                                            </p>
                                            <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                                                Get Started
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-screen-xl mx-auto mt-10 space-y-4 px-4 overflow-auto md:overflow-visible md:px-8">
                        {
                            tables.map((table, idx) => (
                                <table key={idx} className="w-full table-auto text-sm text-left">
                                    <thead className="text-gray-600 font-medium border-b">
                                        <tr>
                                            <th className="z-20 top-12 py-6 lg:sticky">
                                                <div className="flex items-center gap-x-3">
                                                    <div className="w-12 h-12 text-indigo-600 rounded-full border flex items-center justify-center">
                                                        {table.label_icon}
                                                    </div>
                                                    <h4 className="text-gray-800 text-xl font-medium">
                                                        {table.label}
                                                    </h4>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 divide-y">
                                        {
                                            table.items.map((item, idx) => (
                                                <>
                                                    <tr key={idx}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                                        {/* For large devices */}
                                                        <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell">{item.basic}</td>
                                                        <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell">{item.business}</td>
                                                        <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell">{item.enterprise}</td>
                                                        {/* For small devices */}
                                                        <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap lg:hidden">
                                                            {item[selectedPlan.toLowerCase()]}
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
        </section>
        <Footer />
        </AnimatedPage>
    );
};
export default Pricing;