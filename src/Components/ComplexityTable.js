import React from 'react';

const ComplexityTable = ({ title, data }) => {
  return (
    <div className="table-container">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Best</th>
            <th>Average</th>
            <th>Worst</th>
          </tr>
        </thead>
        <tbody>
          {data.map((algorithm, index) => (
            <tr key={index}>
              <td>{algorithm.name}</td>
              <td>{algorithm.best}</td>
              <td>{algorithm.average}</td>
              <td>{algorithm.worst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplexityTable;
