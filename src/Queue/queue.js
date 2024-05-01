import React, { useState } from "react";
import Navbar from "../Components/navbar";
import DiscreteSlider from "../Components/slider";
import "./queue.css";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [maxSize, setSize] = useState(5);
  const [dequeuedElement, setDequeuedElement] = useState(null);
  const [resultText, setResultText] = useState(null);
  const [currVal, setCurrVal] = useState(null);

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
      setResultText("Top value: ");
      setCurrVal(queue[0]); // Peek at the first element in the queue
    } else {
      setResultText("");
      setCurrVal("Queue is empty");
    }
  };

  const isEmpty = () => {
    setResultText("Is empty: ");
    setCurrVal(queue.length === 0 ? "True" : "False");
  };

  const size = () => {
    setResultText("Size: ");
    setCurrVal(queue.length);
  };

  return (
    <>
      <Navbar currentPage="Queue" />

      <div className="queue-visualizer">
        <div>
          <div className="menu">
            <DiscreteSlider
              title="Queue size"
              defaultValue={maxSize}
              onCountChange={setSize}
              step={1}
              min={1}
              max={10}
            />
            <button className="visualize-btn" onClick={enqueue}>
              Enqueue
            </button>
            <button className="reset-btn" onClick={dequeue}>
              Pop
            </button>
            <button onClick={peek}>Peek</button>
            <button onClick={isEmpty}>IsEmpty</button>
            <button onClick={size}>Size</button>
          </div>
          <div className="result">
            {currVal !== null && `${resultText} ${currVal}`}
          </div>
        </div>

        <div className="queue">
          {dequeuedElement && ( // Render the dequeqed element with animation if it exists
            <div
              className="element dequeued"
              onAnimationEnd={() => setDequeuedElement(null)}
            >
              {dequeuedElement}
            </div>
          )}
          {queue.map((value, index) => (
            <div key={index} className="element">
              {value}
            </div>
          ))}
        </div>

        <div className="representation">
          <div className="row mx-auto" id="queue-pseudocode">
            <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
              <div className="ide w-100">
                <div className="row ml-auto mr-auto 1">
                  <span className="comment w-100">--------</span>
                  <span className="comment w-100 mt-1">| ENQUEUE |</span>
                  <span className="comment w-100 mt-1">--------</span>
                  <span className="comment w-100 mt-1">
                    1. Append the data to the array emulating the functionality
                    of a queue.
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
                  <span className="comment w-100">-------</span>
                  <span className="comment w-100 mt-1">| DEQUEUE |</span>
                  <span className="comment w-100 mt-1">-------</span>
                  <span className="comment w-100 mt-1">
                    1. Remove and return the first element of the array
                    emulating the functionality of a queue.
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
                  <span className="comment w-100">--------</span>
                  <span className="comment w-100 mt-1">| PEEK |</span>
                  <span className="comment w-100 mt-1">--------</span>
                  <span className="comment w-100 mt-1">
                    1. Return the first element of the array without removing
                    it, emulating the functionality of a queue.
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
