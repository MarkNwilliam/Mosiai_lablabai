import React from 'react';

export default function GeneratedPost({ postText, imgSrc }) {
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
      <div className="flex h-56 bg-white">
        <div className="flex-shrink-0">
          <img className="h-full w-48 object-cover" src={imgSrc} alt="" />
        </div>
        <div className="px-5 py-3">
          <h3 className="text-gray-700 uppercase">{postText}</h3>
          <span className="text-gray-500 mt-2">{imgSrc}</span>
        </div>
      </div>
      <button className="p-2 rounded-full bg-gray-800 text-white mx-4 -mb-4 hover:bg-gray-500 focus:outline-none focus:bg-gray-500" aria-label="like">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M19.669,2.47c-1.756-1.556-4.588-1.556-6.344,0L12,3.671L11.675,3.45c-1.756-1.556-4.588-1.556-6.344,0 c-1.756,1.556-1.756,4.065,0,5.621l0.325,0.221l0.325-0.221c1.757,1.556,4.588,1.556,6.344,0l0.325-0.221l0.325,0.221 c1.756,1.556,4.588,1.556,6.344,0C21.424,6.536,21.424,4.026,19.669,2.47z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
