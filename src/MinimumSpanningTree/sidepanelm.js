import React, { useState, useEffect } from 'react';
import './sidepanelm.css'; // You can define your styles in this CSS file

const SidePanel = ({ algorithmSteps, isOpen, onClose, onAlgoChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentStep < algorithmSteps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      }else {
        setIsPlaying(false); // Pause when all steps are played
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
    setIsPlaying(false); // Stop playback when closing
    setCurrentStep(0); // Reset step when closing
    onClose();
};

const handleAlgoChange = (pos, val) => {
    setCurrentStep(0); // Reset step when algorithm changes
    onAlgoChange(pos, val);
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
    <p>{algorithmSteps[currentStep].code}</p>
  </div>
)}

    </div>
  );
};

export default SidePanel;
