import React, { useRef, useState } from "react"

const FaqsCard = (props) => {

    const answerElRef = useRef()
    const [state, setState] = useState(false)
    const [answerH, setAnswerH] = useState('0px')
    const { faqsList, idx } = props



    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current.childNodes[0].offsetHeight
        setState(!state)
        setAnswerH(`${answerElH + 20}px`)
    }

    return (
        <div 
            className="space-y-3 mt-5 overflow-hidden border-b"
            key={idx}
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
                {faqsList.q}
                {
                    state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    )
                }
            </h4>
            <div
                ref={answerElRef} className="duration-300"
                style={state ? {height: answerH } : {height: '0px'}}
            >
                <div>
                    <p className="text-gray-500">
                        {faqsList.a}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default () => {

    const faqsList = [
        {
          q: "How can MosiAi help my business streamline data management processes?",
          a: "MosiAi offers powerful data management tools that allow you to efficiently collect, organize, and analyze data. Our platform simplifies data workflows, improves data accuracy, and provides valuable insights for informed decision-making, ultimately helping your business optimize operations and drive growth."
        },
        {
          q: "Can MosiAi integrate with my existing financial systems?",
          a: "Yes, MosiAi is designed to seamlessly integrate with various financial systems. Uploading different formats of data; the system generates financial analysis, visualizations for reporting and traction."
        },
        {
          q: "How does MosiAi enhance digital marketing efforts?",
          a: "MosiAi provides a range of digital marketing tools and resources to boost your online presence. You can leverage our platform for social media management, content creation, email marketing, and analytics. With MosiAi, you'll have the means to develop targeted campaigns, engage with your audience, and track performance to maximize your digital marketing success."
        },
        {
          q: "Is MosiAi suitable for startups in any industry?",
          a: "Absolutely! MosiAi is designed to cater to startups in various industries. Our platform's flexible features and customizable functionalities make it adaptable to the specific needs and requirements of different businesses."
        },
        {
          q: "Can I access MosiAi on mobile devices?",
          a: "Yes, MosiAi is mobile-responsive, allowing you to access the platform on your smartphone or tablet. This ensures that you have the flexibility to manage your business, access key information, and make informed decisions even when you're on the go."
        },
      ];
      

  
    return (
        <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
            <div className="space-y-3 text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Answered all frequently asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="mt-14 max-w-2xl mx-auto">
                {
                    faqsList.map((item, idx) => (
                        <FaqsCard
                            idx={idx}
                            faqsList={item}
                        />
                    ))
                }
            </div>
        </section>
    )
};
