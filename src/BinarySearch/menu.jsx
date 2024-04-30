// Menu.js
import React, { Component } from 'react';
import DiscreteSlider from "./slider";
import RangeSlider from "./douleSlider";

class Menu extends Component {
    state = {
        searchValue: '',
    };

    handleSearchChange = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    handleSearch = () => {
        const searchValue = parseInt(this.state.searchValue);
        if (!isNaN(searchValue)) {
            this.props.onVisualize(searchValue);
        } else {
            // Handle invalid input
        }
    };

    render() {
        return (
            <nav className="nav menu alert-dark">
                {/* Existing code for sliders */}
                <DiscreteSlider
                    default={20}
                    min={10}
                    max={100}
                    step={10}
                    title="Numbers"
                    onCountChange={this.props.onCountChange}
                    disable={this.props.disable}
                />
                {/* <DiscreteSlider
                    default={50}
                    min={10}
                    max={100}
                    step={1}
                    title="Speed"
                    onCountChange={this.props.onSpeedChange}
                    disable={false}
                /> */}
                {/* Input box for search value */}
                <input
                    type="number"
                    value={this.state.searchValue}
                    onChange={this.handleSearchChange}
                    placeholder="Search a Value"
                    disabled={this.props.disable}
                />
                {/* Button to trigger search */}
                <button
                    className='visualize-btn btn-warning btn-lg '
                    onClick={this.handleSearch}
                    disabled={this.props.disable}
                    style={this.isClickable()}
                >
                    Search
                </button>
                {/* Reset button */}
                <button
                    className='reset-btn btn-secondary m-2'
                    onClick={this.props.onReset}
                    disabled={this.props.disable}
                    style={this.isClickable()}
                >
                    Reset
                </button>
            </nav>
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
