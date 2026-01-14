import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const TARGET_URL = "https://kv-detailed-yearly-repor-qc08pfv.gamma.site/";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading state
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 text-white animate-in fade-in duration-300">
          <Loader2 className="w-12 h-12 mb-4 animate-spin text-indigo-500" />
          <p className="text-lg font-medium text-gray-300">Loading Report...</p>
        </div>
      )}

      {/* Main Iframe */}
      <iframe
        src={TARGET_URL}
        className="flex-grow w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        title="KV Detailed Yearly Report"
        onLoad={handleIframeLoad}
        style={{ display: 'block' }} 
      />
    </div>
  );
}
