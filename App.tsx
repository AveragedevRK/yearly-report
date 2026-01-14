import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ExternalLink, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

TARGET_URL = "https://kv-detailed-yearly-repor-qc08pfv.gamma.site/";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); // Used to force reload iframe
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle loading state
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Sync internal state with actual document fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls for immersion
  useEffect(() => {
    const resetControlsTimer = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide after 3 seconds of inactivity
    };

    window.addEventListener('mousemove', resetControlsTimer);
    window.addEventListener('touchstart', resetControlsTimer);
    window.addEventListener('click', resetControlsTimer);
    
    // Initial timer
    resetControlsTimer();

    return () => {
      window.removeEventListener('mousemove', resetControlsTimer);
      window.removeEventListener('touchstart', resetControlsTimer);
      window.removeEventListener('click', resetControlsTimer);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col"
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900 text-white animate-in fade-in duration-300">
          <Loader2 className="w-12 h-12 mb-4 animate-spin text-indigo-500" />
          <p className="text-lg font-medium text-gray-300">Loading Report...</p>
        </div>
      )}

      {/* Main Iframe */}
      <iframe
        key={iframeKey}
        src={TARGET_URL}
        className="flex-grow w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        title="KV Detailed Yearly Report"
        onLoad={handleIframeLoad}
        style={{ display: 'block' }} // Removes any default inline spacing
      />

  );
}
