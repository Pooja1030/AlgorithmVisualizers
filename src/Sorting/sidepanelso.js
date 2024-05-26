import React, { useState, useEffect, useRef } from 'react';
import './sidepanelso.css'; // Make sure to define your styles in this CSS file
import { CloseRounded } from '@material-ui/icons';
import { gsap } from 'gsap';

const SidePanel = ({ algorithmSteps1, algorithmSteps2, isOpen, onClose, isDouble }) => {
  const [currentStep1, setCurrentStep1] = useState(0);
  const [currentStep2, setCurrentStep2] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const stepRefs1 = useRef([]);
  const stepRefs2 = useRef([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep1(0);
      setCurrentStep2(0);
      setIsPlaying(true);
      startPlayback();
    } else {
      setCurrentStep1(0);
      setCurrentStep2(0);
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, algorithmSteps1, algorithmSteps2, isDouble]);

  useEffect(() => {
    if (isOpen) {
      stepRefs1.current[currentStep1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      gsap.to(stepRefs1.current, {
        color: (i) => (i === currentStep1 ? '#000' : '#555'),
        fontWeight: (i) => (i === currentStep1 ? 'bold' : 'normal'),
        duration: 1,
            overwrite: 'auto'
      });

      if (isDouble) {
        stepRefs2.current[currentStep2]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        gsap.to(stepRefs2.current, {
          color: (i) => (i === currentStep2 ? '#000' : '#555'),
          fontWeight: (i) => (i === currentStep2 ? 'bold' : 'normal'),
          duration: 1,
           overwrite: 'auto'
        });
 
      }
    }
  }, [currentStep1, currentStep2, isOpen, isDouble]);

  const startPlayback = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentStep1((prevStep) => {
        const nextStep = prevStep + 1;
        if (nextStep >= algorithmSteps1.length && (!isDouble || nextStep >= algorithmSteps2.length)) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prevStep;
        }
        return nextStep;
      });
      if (isDouble) {
        setCurrentStep2((prevStep) => Math.min(prevStep + 1, algorithmSteps2.length - 1));
      }
    }, 1000);
  };

  const handleClose = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setCurrentStep1(0);
    setCurrentStep2(0);
    onClose();
  };

  const togglePlayPause = () => {
    if (!isPlaying) {
      if (currentStep1 === algorithmSteps1.length - 1 && (!isDouble || currentStep2 === algorithmSteps2.length - 1)) {
        setCurrentStep1(0);
        setCurrentStep2(0);
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
    setCurrentStep1((prevStep) => Math.max(prevStep - 1, 0));
    if (isDouble) {
      setCurrentStep2((prevStep) => Math.max(prevStep - 1, 0));
    }
  };

  const forward = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setCurrentStep1((prevStep) => Math.min(prevStep + 1, algorithmSteps1.length - 1));
    if (isDouble) {
      setCurrentStep2((prevStep) => Math.min(prevStep + 1, algorithmSteps2.length - 1));
    }
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
            <div className={`panel-section ${isDouble ? 'half-height' : ''}`}>
              {algorithmSteps1.map((step, index) => (
                <p
                  key={index}
                  ref={(el) => (stepRefs1.current[index] = el)}
                  className="step"
                >
                  {step.code}
                </p>
              ))}
            </div>
            {isDouble && (
              <div>
                <hr />
                <div className="panel-section half-height">
                  {algorithmSteps2.map((step, index) => (
                    <p
                      key={index}
                      ref={(el) => (stepRefs2.current[index] = el)}
                      className="step"
                    >
                      {step.code}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SidePanel;
