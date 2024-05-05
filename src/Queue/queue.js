import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import DiscreteSlider from "../Components/slider";
import SidePanel from './sidepanelQ'; // Import the SidePanel component
import "./queue.css"
import { gsap } from 'gsap';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [maxSize, setSize] = useState(5);
  const [dequeuedElement, setDequeuedElement] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [currVal, setCurrVal] = useState(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false); // State to manage side panel visibility
  const [algorithmSteps, setAlgorithmSteps] = useState([]);


  useEffect(() => {
    // Define your algorithm steps here
    const steps = [
      {
        code:`1. two pointers FRONT and REAR`
      },
      {
        code:`2. FRONT track the first element of the queue`
      },
      {
        code:`3. REAR track the last element of the queue`
      },
      {
        code:`4. initially, set value of FRONT and REAR to -1`
      },
    ];

    setAlgorithmSteps(steps);
  }, []);



  const enqueue = () => {
    setResultText(null);
    setCurrVal(null);
    if (queue.length < maxSize) {
      const newValue = Math.floor(Math.random() * 10) + 1; // Generate random value
      setQueue((prevQueue) => [...prevQueue, newValue]);
    } else {
      setResultText("");
      setCurrVal("Queue is full");
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setResultText("Dequeued: ");
      setCurrVal(queue[queue.length - 1]);
      setDequeuedElement(queue[0]); // Store the dequeued element
      setQueue((prevQueue) => prevQueue.slice(1)); // Remove the first element from the queue
      setTimeout(() => {
        setDequeuedElement(null); // Clear the dequeued element after the animation duration
      }, 500); // Adjust animation duration as needed
    } else {
      setResultText("");
      setCurrVal("Queue is empty");
    }
  };

  const peek = () => {
    if (queue.length > 0) {
      setResultText("Front: ");
      setCurrVal(queue[0]); // Peek at the first element in the queue
      const timeline = gsap.timeline();
      timeline.to(".top", { background: "#992155", duration: 0.5 });
      timeline.to(".top", { background: "#fb21d3", duration: 0.5, delay: 1 });
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
    setSidePanelOpen(!sidePanelOpen);
  };

  return (
    <>
      <Navbar currentPage="Queue" />

      {/* Side panel toggle button */}
      <button className="side-panel-toggle" onClick={toggleSidePanel}>→</button>

      {/* Render the side panel component */}
      {/* <SidePanel isOpen={sidePanelOpen} onClose={toggleSidePanel} /> */}
      <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={toggleSidePanel} />

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
          {dequeuedElement && ( // Render the dequeqed element with animation if it exists
            <div
              className="element dequeued "
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
            <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
              <div className="ide w-100">
                <div className="row ml-auto mr-auto 1">

                  <h3>ENQUEUE </h3>
                  <span className="comment w-100 mt-1">
                    Add an element to the end of the queue
                  </span>
                  <span className="comment w-100 mt-1"> </span>
                  <span className="comment w-100 mt-1">
                    TIME COMPLEXITY: O(1)
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
              <div className="ide w-100">
                <div className="row ml-auto mr-auto 1">

                  <h3>DEQUEUE </h3>
                  <span className="comment w-100 mt-1">
                    Remove an element from the front of the queue
                  </span>
                  <span className="comment w-100 mt-1"> </span>
                  <span className="comment w-100 mt-1">
                    TIME COMPLEXITY: O(1)
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
              <div className="ide w-100">
                <div className="row ml-auto mr-auto 1">

                  <h3>PEEK </h3>
                  <span className="comment w-100 mt-1">
                    Get the value of the front of the queue without removing it

                  </span>
                  <span className="comment w-100 mt-1"> </span>
                  <span className="comment w-100 mt-1">
                    TIME COMPLEXITY: O(1)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueueVisualizer;
