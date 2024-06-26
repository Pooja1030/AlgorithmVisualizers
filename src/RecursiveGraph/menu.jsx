import React, { Component } from 'react';
import SimpleSelect from "../Components/simpleSelect";


class Menu extends Component {
    render() {
        return (
            <div className="menu">
                {/*<DiscreteSlider*/}
                {/*    default={50}*/}
                {/*    min={10}*/}
                {/*    max={100}*/}
                {/*    step={1}*/}
                {/*    title="Speed"*/}
                {/*    onCountChange={this.props.onSpeedChange}*/}
                {/*    isDisabled={false}*/}
                {/*/>*/}

                <SimpleSelect
                    pos={0}
                    label={'Task'}
                    items={['Fibonacci', 'Binomial Coefficient', "Derangement", "Bigmod", "Stirling2"]}
                    onValueChanged={this.props.onAlgoChanged}
                />
                <SimpleSelect
                    pos={0}
                    label={'N'}
                    items={[0, 1, 2, 3, 4, 5, 6]}
                    onValueChanged={this.props.setN}
                />
                <SimpleSelect
                    pos={0}
                    label={'R'}
                    items={[0, 1, 2, 3, 4, 5, 6]}
                    onValueChanged={this.props.setR}
                />
               <button
                    className='visualize-btn btn-warning btn-lg '
                    onClick={this.props.onStart}
                    disabled={this.props.isDisabled}
                >Visualize</button>
                <button
                    className='reset-btn btn-warning btn-lg m-2'
                    onClick={this.props.onReset}
                    disabled={this.props.isDisabled}
                >Reset</button>
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