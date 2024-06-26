import React, { Component } from 'react';
import DiscreteSlider from '../Components/slider'



class Menu extends Component {
    render() {
        return (
            <div className="menu alert-dark">
                <div className='controls'>
                    <DiscreteSlider
                        default={4}
                        min={4}
                        max={8}
                        step={1}
                        title="Grid size"
                        onCountChange={this.props.onCountChange}
                        isDisabled={this.props.isDisabled}
                    />
                    <DiscreteSlider
                        default={50}
                        min={1}
                        max={100}
                        step={1}
                        title="Speed"
                        onCountChange={this.props.onSpeedChange}
                    />
                </div>
                <div>
                    <button
                        className='visualize-btn btn-warning btn-lg '
                        onClick={this.props.onVisualize}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Visualize
                    </button>
                    <button
                        className='reset-btn btn-secondary m-2'
                        onClick={this.props.onClear}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Clear Board
                    </button>
                </div>
            </div>
        );
    }
    isClickable = () => {
        if (this.props.disable) {
            return { cursor: "not-allowed" };
        } else {
            return {};
        }
    }
}


export default Menu;