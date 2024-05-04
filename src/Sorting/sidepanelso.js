import React, { useState, useEffect } from 'react';
import './sidepanelso.css'; // You can define your styles in this CSS file

const SidePanel = ({ algorithmSteps, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentStep < algorithmSteps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      }
    }, 1000); // Change the interval as per your requirement

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, algorithmSteps]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const forward = () => {
    setCurrentStep(prevStep =>
      Math.min(prevStep + 1, algorithmSteps.length - 1)
    );
  };

  const handleClose = () => {
    onClose(); // Invoke the onClose callback function to close the side panel
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      {/* Close button on top */}
      <button className="close-btn" onClick={handleClose}>
        <span>&#8592;</span>
      </button>
      {/* Buttons in a row */}
      <div className="buttons-row">
        <button className="toggle-btn" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="rewind-btn" onClick={rewind}>
          Rewind
        </button>
        <button className="forward-btn" onClick={forward}>
          Forward
        </button>
      </div>
      {/* Panel content */}
      {isOpen && algorithmSteps && algorithmSteps.length > 0 && (
  <div className="panel-content">
    {/* Render the code related to current step */}
    <pre>{algorithmSteps[currentStep].code}</pre>
  </div>
)}

    </div>
  );
};

export default SidePanel;
