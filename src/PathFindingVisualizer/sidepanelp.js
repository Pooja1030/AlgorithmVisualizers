import React, { useState, useEffect } from 'react';
import './sidepanelp.css';

const SidePanel = ({ algorithmSteps, isOpen, onClose, onAlgoChange }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && currentStep < algorithmSteps.length - 1) {
                setCurrentStep(prevStep => prevStep + 1);
            } else {
                setIsPlaying(false); // Pause when all steps are played
            }
        }, 1000);

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
            <button className="close-btn" onClick={handleClose}>
                <span>&#8592;</span>
            </button>
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
            {isOpen && algorithmSteps && algorithmSteps.length > 0 && (
                <div className="panel-content">
                    <p>{algorithmSteps[currentStep].code}</p>
                </div>
            )}
        </div>
    );
};

export default SidePanel;
