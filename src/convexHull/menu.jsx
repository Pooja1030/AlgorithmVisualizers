import React, { Component } from 'react';
import DiscreteSlider from '../Components/slider';

class Menu extends Component {
    render() {
        return (
            <div className="menu alert-dark">
                <div className='controls'>
                    <DiscreteSlider
                        onCountChange={this.props.onChangeSpeed}
                        title="speed"
                        marks={false}
                        default={20}
                        step={1}
                        min={10}
                        max={50}
                        isDisabled={false}
                    />
                    <DiscreteSlider
                        onCountChange={this.props.onChangeValues}
                        title="Total Number"
                        marks={false}
                        default={100}
                        step={10}
                        min={10}
                        max={100}
                        isDisabled={this.props.isDisabled}
                    />
                </div>
                <div>
                    <button
                        className="visualize-btn btn-warning btn-lg m-2"
                        onClick={this.props.onVisualize}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Visualize Graham Scan
                    </button>
                    <button className="reset-btn btn-primary btn-lg m-2" onClick={this.props.onRefresh} disabled={this.props.isDisabled} style={this.isClickable()}>Refresh</button>
                </div>

            </div>
        );
    }
    isClickable = () => {
        if (this.props.isDisabled) {
            return { cursor: "not-allowed" };
        } else {
            return {};
        }
    }
}

export default Menu;