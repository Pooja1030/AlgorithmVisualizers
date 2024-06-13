import React, { Component } from 'react';
import DiscreteSlider from "../Components/slider";
import SimpleSelect from "../Components/simpleSelect";

class Menu extends Component {
    render() {
        return (
                  <div className="menu alert-dark">

                    <DiscreteSlider
                        default={50}
                        min={10}
                        max={100}
                        step={5}
                        title="Speed"
                        onCountChange={this.props.onSpeedChange}
                        isDisabled={false}
                    />

                    <SimpleSelect
                        label={"Algorithm"}
                        pos={0}
                        onValueChanged={this.props.onAlgoChanged}
                        items={["Dijkstra's Algorithm",
                            "A* Algorithm",
                            "Depth-first Search",
                            "Breadth-first search"]} />
                    <div>
                        <button
                            className='visualize-btn btn-warning btn-lg '
                            onClick={this.props.onVisualize}
                            disabled={this.props.isDisabled}
                        // style={this.isClickable()}
                        >
                            Find path
                        </button>
                        <button
                            className='reset-btn btn-secondary m-2'
                            onClick={this.props.onRandomize}
                            disabled={this.props.isDisabled}
                            style={this.isClickable()}
                        >
                            Reset
                        </button>
                    </div>
                    <div>
                        <div className='node-type'>
                            <div className='node node-start'></div>
                            <p> Start Node </p>
                        </div>
                        <div className='node-type'>
                            <div className='node node-finish'></div>
                            <p>End Node</p>
                        </div>
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