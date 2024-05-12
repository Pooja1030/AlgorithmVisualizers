import React, { useState, useEffect } from 'react';
import './sidepanelso.css'; // You can define your styles in this CSS file

const SidePanel = ({ algorithmSteps, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executedSteps, setExecutedSteps] = useState([]); // State to hold executed steps

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < algorithmSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prevStep => prevStep + 1);
      }, 1000); // Change the interval as per your requirement
    } else {
      clearInterval(interval);
      setIsPlaying(false); // Pause when all steps are played or stopped manually
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, algorithmSteps]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const forward = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, algorithmSteps.length - 1));
  };

  const handleClose = () => {
    setIsPlaying(false); // Stop playback when closing
    setCurrentStep(0); // Reset step when closing
    onClose();
  };

  useEffect(() => {
    setExecutedSteps(algorithmSteps.slice(0, currentStep + 1));
  }, [currentStep, algorithmSteps]);

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
        <button className="rewind-btn" onClick={rewind} disabled={currentStep === 0}>
          Rewind
        </button>
        <button className="forward-btn" onClick={forward} disabled={currentStep === algorithmSteps.length - 1}>
          Forward
        </button>
      </div>
      {/* Panel content */}
      {isOpen && (
        <div className="panel-content">
          {/* Render the code related to current step */}
          {executedSteps.map((step, index) => (
            <p key={index}>{step.code}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidePanel;
