import React, { useState, useEffect, useRef } from 'react';
import './sidepanel.css';
import { CloseRounded } from '@material-ui/icons';
import { gsap } from 'gsap';

const SidePanel = ({ algorithmSteps, isOpen, onClose, onAlgoChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const stepRefs = useRef([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsPlaying(true);
      startPlayback();
    } else {
      setCurrentStep(0);
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, algorithmSteps]);

  useEffect(() => {
    if (isOpen && stepRefs.current.length > 0) {
      stepRefs.current[currentStep]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      gsap.to(stepRefs.current, {
        color: (i) => (i === currentStep ? '#000' : '#555'),
        fontWeight: (i) => (i === currentStep ? 'bold' : 'normal'),
        duration: 1,
        overwrite: 'auto'
      });

    }
  }, [currentStep, isOpen]);

  const startPlayback = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentStep((prevStep) => {
        const nextStep = prevStep + 1;
        if (nextStep >= algorithmSteps.length) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prevStep;
        }
        return nextStep;
      });
    }, 1000);
  };

  const handleClose = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setCurrentStep(0);
    onClose();
  };

  const togglePlayPause = () => {
    if (!isPlaying) {
      if (currentStep === algorithmSteps.length - 1) {
        setCurrentStep(0); // Restart from the beginning if at the end
      }
      setIsPlaying(true);
      startPlayback();
    } else {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  };

  const rewind = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const forward = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, algorithmSteps.length - 1));
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <>
          <div className="side-panel-header">
            <span>Algorithm Steps</span>
            <button className="close-btn" onClick={handleClose}>
              <CloseRounded />
            </button>
          </div>
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
          <div className="panel-content">
            {algorithmSteps.map((step, index) => (
              <p
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className="step"
              >
                {step.code}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SidePanel;
