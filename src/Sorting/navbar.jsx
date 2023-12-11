import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <span className="home-btn"><Link to={"/"}>Algorithm Visualizer</Link></span>
                <ArrowForwardIosRoundedIcon className='arrow'/>
                <span className="current-page">{this.props.currentPage}</span>
            </nav>
        );
    }

}

export default Navbar;