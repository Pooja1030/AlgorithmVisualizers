import React, { Component } from 'react';
import './style.css';

class Rect extends Component {
    render() {
        return (
            <div>
            {this.props.rect.width}
            <div
                className='rect'
                style={
                    {
                        height: this.props.rect.width,
                        background: this.checkColor(),
                        margin: this.props.marg,
                        // float:'left',
                        'verticalAlign': 'middle'
                    }}
            >
            </div>
            </div>
        );
    }
    checkColor = () => {
        if (this.props.rect.isSorted) {
            return "#5a43c3";
        } else if (this.props.rect.isSorting) {
            return "#FE7BE5";
        } else {
            return "#313866"
        }
    }
}

export default Rect;