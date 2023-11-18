import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import  Lottie  from 'lottie-react'; 
import fhomeAnimation from "../animation/87982-business-intelligence.json";
const features = [
  {
    name: 'Unlocking the Power of Your Data with MosiAi',
    description:
      'Managing and harnessing data is a critical aspect of running a successful business in the digital age. Mosi Ai offers you the tools and resources to enhance your data management capabilities, allowing you to extract valuable insights and make informed decisions.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Taking Control of Your Finances with MosiAi',
    description: 'Financial management is the lifeblood of any business, and MosiAi is here to simplify and optimize your financial processes. Our platform empowers you to efficiently handle financial documents, analyze expenses, and generate accurate financial reports. ',
    icon: LockClosedIcon,
  },
  {
    name: 'Supercharging Your Marketing Efforts with MosiAi.',
    description: 'In todays digital landscape, a strong online presence is essential for business success. MosiAi provides you with a suite of tools and resources to enhance your digital marketing strategies. Our platform enables you to create consistent social media management, analyze customer feedback and content creation.',
    icon: ServerIcon,
  },
]

export default function Fhome() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Do business faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Mosi Ai revolutionizes business operations by providing an all-in-one platform that enhances data management, improves financial processes, and supercharges digital marketing strategies for businesses.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
                 <Lottie 
    animationData={fhomeAnimation} 
    loop={true} 
    alt="Product screenshot"
    
    className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
  />
        </div>
      </div>
    </div>
  )
}

//style={{ width: '100%', height: '100%', maxWidth: '300px', maxHeight: '300px' }}