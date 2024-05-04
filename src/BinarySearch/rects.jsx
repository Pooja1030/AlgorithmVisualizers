import React from 'react';
import "./style4.css";

const Rects = ({ rects, target }) => {
  return (
    <div className="rects-container">
      {rects.map((rect, index) => (
        <div
          key={index}
          className={`rect ${rect.isHighlight ? 'highlight' : ''} ${rect.isTarget ? 'target' : ''}`}
        >
          {rect.value}
        </div>
      ))}
    </div>
  );
};

export default Rects;
