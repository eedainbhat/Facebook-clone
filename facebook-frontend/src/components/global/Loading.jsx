import React from 'react';
import metaLogo from '../../assets/meta-logo.png';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#f0f2f5] flex flex-col items-center justify-center z-50 font-sans">
      
      <div className="flex-1 flex items-center justify-center mb-6">
        
        <svg viewBox="0 0 36 36" className="w-21.25 h-21.25 text-[#1877f2]" fill="currentColor">
          <path d="M18 0C8.06 0 0 8.06 0 18c0 8.95 6.53 16.38 15.19 17.81V23.2h-4.57v-5.2h4.57v-3.95c0-4.52 2.69-7.03 6.82-7.03 1.97 0 4.04.35 4.04.35v4.44h-2.28c-2.24 0-2.94 1.39-2.94 2.81v3.38h5.02l-.8 5.2h-4.22v12.61C29.47 34.38 36 26.95 36 18 36 8.06 27.94 0 18 0z" />
        </svg>
      </div>

      
      <div className="absolute bottom-10 flex flex-col items-center">
        <span className="text-[#8a8d91] text-[1rem] mb-1.5">from</span>
        
        
        <img 
          src={metaLogo} 
          alt="Meta" 
          className="h-30 object-contain" 
        />
      </div>

    </div>
  );
};

export default Loading;