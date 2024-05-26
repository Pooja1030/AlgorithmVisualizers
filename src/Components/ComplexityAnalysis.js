// ComplexityAnalysis.js
import React from 'react';

const ComplexityAnalysis = ({ timeComplexity, realTimeComplexity, spaceComplexity, realSpaceComplexity }) => {

  return (
    <div className="complexity-analysis">
      {timeComplexity &&
        <div className="complexity-box">
          <div className="analysis-title">Time Complexity</div>
          <div className="analysis-result">
            <span className="complexity">{timeComplexity}</span>
            {realTimeComplexity && <span className="real-complexity">{realTimeComplexity}</span>}
          </div>
        </div>}
      {spaceComplexity &&
        <div className="complexity-box">
          <div className="analysis-title">Space Complexity</div>
          <div className="analysis-result">
            <span className="complexity">{spaceComplexity}</span>
            {realSpaceComplexity && <span className="real-complexity">{realSpaceComplexity}</span>}
          </div>
        </div>}
    </div>
  );
};

export default ComplexityAnalysis;
