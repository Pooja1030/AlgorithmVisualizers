import React, { useState, useEffect } from 'react';
import './sidepanelso.css'; // You can define your styles in this CSS file
import { CloseRounded } from '@material-ui/icons';

const SidePanel = ({ algorithmSteps1, algorithmSteps2, isOpen, onClose, isDouble }) => {
  const [currentStep1, setCurrentStep1] = useState(0);
  const [currentStep2, setCurrentStep2] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executedSteps1, setExecutedSteps1] = useState([]);
  const [executedSteps2, setExecutedSteps2] = useState([]);

  useEffect(() => {
    let interval;
    if (isPlaying && (currentStep1 < algorithmSteps1.length - 1 || (isDouble && currentStep2 < algorithmSteps2.length - 1))) {
      interval = setInterval(() => {
        setCurrentStep1(prevStep => Math.min(prevStep + 1, algorithmSteps1.length - 1));
        if (isDouble) {
          setCurrentStep2(prevStep => Math.min(prevStep + 1, algorithmSteps2.length - 1));
        }
      }, 1000); // Change the interval as per your requirement
    } else {
      clearInterval(interval);
      setIsPlaying(false); // Pause when all steps are played or stopped manually
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep1, currentStep2, algorithmSteps1, algorithmSteps2, isDouble]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    if (currentStep1 > 0) {
      setCurrentStep1(prevStep => prevStep - 1);
    }
    if (isDouble && currentStep2 > 0) {
      setCurrentStep2(prevStep => prevStep - 1);
    }
  };

  const forward = () => {
    setCurrentStep1(prevStep => Math.min(prevStep + 1, algorithmSteps1.length - 1));
    if (isDouble) {
      setCurrentStep2(prevStep => Math.min(prevStep + 1, algorithmSteps2.length - 1));
    }
  };

  const handleClose = () => {
    setIsPlaying(false); // Stop playback when closing
    setCurrentStep1(0); // Reset step when closing
    setCurrentStep2(0); // Reset step when closing
    onClose();
  };

  useEffect(() => {
    setExecutedSteps1(algorithmSteps1.slice(0, currentStep1 + 1));
    if (isDouble) {
      setExecutedSteps2(algorithmSteps2.slice(0, currentStep2 + 1));
    }
  }, [currentStep1, currentStep2, algorithmSteps1, algorithmSteps2, isDouble]);

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      {isOpen &&
        <button className="close-btn" onClick={handleClose}>
          <CloseRounded />
        </button>
      }
      <div className="buttons-row">
        <button className="toggle-btn" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="rewind-btn" onClick={rewind} disabled={currentStep1 === 0 && (!isDouble || currentStep2 === 0)}>
          Rewind
        </button>
        <button className="forward-btn" onClick={forward} disabled={currentStep1 === algorithmSteps1.length - 1 && (!isDouble || currentStep2 === algorithmSteps2.length - 1)}>
          Forward
        </button>
      </div>
      {isOpen && (
        <div className="panel-content">
          <div className={`panel-section ${isDouble ? 'half-width' : ''}`}>
            {executedSteps1.map((step, index) => (
              <p key={index}>{step.code}</p>
            ))}
          </div>
          {isDouble && (
            <div>
              <hr />
              <div className="panel-section half-width">
                {executedSteps2.map((step, index) => (
                  <p key={index}>{step.code}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidePanel;
