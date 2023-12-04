
import React from 'react';
import { Link } from 'react-router-dom';

class Sorting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedViz: 'Bubble',                           // Defaultly selected visualization
    };
  }

//  const Sorting = () => {
  render() {
    return (
      <nav id="topbar">
        <span id="title">
          <Link to="/sorting/Bubble" className={this.state.selectedViz === 'Bubble' ? 'selected-viz' : ''}>
            Bubble
          </Link>
          <Link to="/sorting/Selection" className={this.state.selectedViz === 'Selection' ? 'selected-viz' : ''}>
            Select
          </Link>
          <Link to="/sorting/Insert" className={this.state.selectedViz === 'Insertion' ? 'selected-viz' : ''}>
            Select
          </Link>
          <Link to="/sorting/Merge" className={this.state.selectedViz === 'Merge' ? 'selected-viz' : ''}>
            Select
          </Link>
          <Link to="/sorting/Quick" className={this.state.selectedViz === 'Quick' ? 'selected-viz' : ''}>
            Select
          </Link>
          {/* Add more links for other visualization titles */}
        </span>
        {/* ... Other elements ... */}
      </nav>
    );
    }
}

// 
export default Sorting;
