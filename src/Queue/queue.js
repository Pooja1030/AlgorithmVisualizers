import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/navbar";
import DiscreteSlider from "../Components/slider";
import SidePanel from './sidepanelQ';
import "./queue.css";
import { gsap } from 'gsap';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [maxSize, setSize] = useState(5);
  const [dequeuedElement, setDequeuedElement] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [currVal, setCurrVal] = useState(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [lastOperation, setLastOperation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const stepsRef = useRef([
    { code: `Working of Queue` },
    { code: `- two pointers FRONT and REAR` },
    { code: `- FRONT track the first element of the queue` },
    { code: `- REAR track the last element of the queue` },
    { code: `- initially, set value of FRONT and REAR to -1` },
    { code: `Enqueue Operation` },
    { code: `- check if the queue is full`},
    { code: `- for the first element, set the value of FRONT to 0`},
    { code: `- increase the REAR index by 1`},
    { code: `- add the new element in the position pointed to by REAR`},
    { code: `Dequeue Operation` },
    { code: `- check if the queue is empty`},
    { code: `- return the value pointed by FRONT`},
    { code: `- increase the FRONT index by 1`},
    { code: `- for the last element, reset the values of FRONT and REAR to -1`},
  ]);

  useEffect(() => {
    setAlgorithmSteps(stepsRef.current);
  }, []);

  const setStepsAndAnimate = (steps) => {
    setAlgorithmSteps(steps);
    startAnimationSteps();
  };

  const startAnimationSteps = () => {
    const timeline = gsap.timeline();
    algorithmSteps.forEach((step, index) => {
      timeline.to(`#step-${index}`, { opacity: 1, duration: 0.5 });
      timeline.to(`#step-${index}`, { opacity: 0, duration: 0.5, delay: 1 });
    });
  };

  const updateOperation = (operation, newValue = null) => {
    setResultText(null);
    setCurrVal(null);
    if (lastOperation !== operation) {
      setSidePanelOpen(true);
      setLastOperation(operation);
      setCurrentStep(0);
    }
    const updatedSteps = [
      { code: `${operation} ${newValue !== null ? newValue : ''}` },
      // Add more steps if needed
    ];
    setStepsAndAnimate(updatedSteps);
  };

  const enqueue = () => {
    if (queue.length < maxSize) {
      const newValue = Math.floor(Math.random() * 10) + 1;
      setQueue((prevQueue) => [...prevQueue, newValue]);
      updateOperation('Enqueueing', newValue);
    } else {
      setResultText("");
      setCurrVal("Queue is full");
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setResultText("Dequeued: ");
      setCurrVal(queue[0]);
      setDequeuedElement(queue[0]);
      setQueue((prevQueue) => prevQueue.slice(1));
      updateOperation('Dequeueing', queue[0]);
    } else {
      setResultText("");
      setCurrVal("Queue is empty");
    }
  };

  const peek = () => {
    if (queue.length > 0) {
      setResultText("Front: ");
      setCurrVal(queue[0]);
      const timeline = gsap.timeline();
      timeline.to(".top", { background: "#992155", duration: 0.5 });
      timeline.to(".top", { background: "#fb21d3", duration: 0.5, delay: 1 });
      updateOperation('Peeking', queue[0]);
    } else {
      setResultText("");
      setCurrVal("Queue is empty");
    }
  };

  const isEmpty = () => {
    setResultText("Is empty: ");
    setCurrVal(queue.length === 0 ? "True" : "False");
  };
  
  const isFull = () => {
    setResultText("Is full: ");
    setCurrVal(queue.length === maxSize ? "True" : "False");
  };

  const size = () => {
    setResultText("Size: ");
    setCurrVal(queue.length);
  };

  const toggleSidePanel = () => {
  if (lastOperation && sidePanelOpen) {
    setAlgorithmSteps(stepsRef.current);
    setCurrentStep(0);
    setLastOperation(null); // Reset lastOperation when closing the triggered side panel
  } else if (!sidePanelOpen) {
    setAlgorithmSteps(stepsRef.current); // Reset algorithm steps when opening the side panel
    setCurrentStep(0);
  }
  setSidePanelOpen(!sidePanelOpen);
};


  const rewind = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const timeline = gsap.timeline();
      timeline.to(`#step-${currentStep}`, { opacity: 0, duration: 0.5 });
      timeline.to(`#step-${currentStep - 1}`, { opacity: 1, duration: 0.5 });
    }
  };

  const forward = () => {
    if (currentStep < algorithmSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      const timeline = gsap.timeline();
      timeline.to(`#step-${currentStep}`, { opacity: 0, duration: 0.5 });
      timeline.to(`#step-${currentStep + 1}`, { opacity: 1, duration: 0.5 });
    }
  };

  return (
    <>
      <Navbar currentPage="Queue" />
      <button className="side-panel-toggle" onClick={toggleSidePanel}>→</button>
      <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={toggleSidePanel} rewind={rewind} forward={forward} />
      <div className="queue-visualizer">
        <div>
          <div className="menu">
            <DiscreteSlider
              title='Queue size'
              default={maxSize}
              onCountChange={setSize}
              step={1}
              min={1}
              max={10} />
            <button className='visualize-btn' onClick={enqueue}>Enqueue</button>
            <button className='reset-btn' onClick={dequeue}>Dequeue</button>
            <button onClick={peek}>Peek</button>
            <button onClick={isEmpty}>IsEmpty</button>
            <button onClick={isFull}>IsFull</button>
            <button onClick={size}>Size</button>
          </div>
          <div className="result">{currVal !== null && `${resultText} ${currVal}`}</div>
        </div>

        <div className="queue">
          {dequeuedElement && (
            <div
              className="element dequeued"
              onAnimationEnd={() => setDequeuedElement(null)}
            >
              {dequeuedElement}
            </div>
          )}
          {queue.map((value, index) => (
            <div key={index} className={`element ${index === 0 ? "top" : ""}`}>
              {value}
            </div>
          ))}
        </div>

        <div className="representation">
          <div className="row mx-auto" id="queue-pseudocode">
            {algorithmSteps.map((step, index) => (
              <div key={index} id={`step-${index}`} className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0" style={{ opacity: index === currentStep ? 1 : 0 }}>
                <div className="ide w-100">
                  <div className="row ml-auto mr-auto 1">
                    <h3>{step.code}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QueueVisualizer;
