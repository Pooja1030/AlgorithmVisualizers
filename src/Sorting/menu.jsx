import React, { Component } from 'react';
import DiscreteSlider from "../Components/slider";
import SimpleSelect from "../Components/simpleSelect";
import RangeSlider from '../Components/douleSlider';
import SwitchLabels from "../Components/formControlLabel";
// import CustomizedSlider from '../Components/douleSlider';


class Menu extends Component {
    render() {
        return (
            <nav className="nav menu alert-dark">

                {/* <RangeSlider
                    isDisabled={this.props.isDisabled}
                /> */}
                <DiscreteSlider
                    default={20}
                    min={10}
                    max={100}
                    step={10}
                    title="Numbers"
                    onCountChange={this.props.onCountChange}
                    isDisabled={this.props.isDisabled}
                />
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
                    pos={0}
                    label={"Algorithm"}
                    onValueChanged={this.props.onAlgoChanged}
                    items={["Bubble Sort",
                    "Selection Sort",
                    "Insertion Sort",
                    "Quick Sort"]}
                />
                <SwitchLabels
                    isDisabled={this.props.isDisabled}
                    onDoubleChange={this.props.onDoubleChange}
                />
                <SimpleSelect
                    pos={1}
                    label={"Algorithm"}
                    onValueChanged={this.props.onAlgoChanged}
                    items={["Bubble Sort",
                        "Selection Sort",
                        "Insertion Sort",
                        "Quick Sort"]}
                />
                <div>
                    <button
                        className='visualize-btn btn-warning btn-lg '
                        onClick={this.props.onVisualize}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Sort
                    </button>
                    <button
                        className='reset-btn btn-secondary m-2'
                        onClick={this.props.onRandomize}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Randomize
                    </button>
                </div>
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