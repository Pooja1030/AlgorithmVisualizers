import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <span className="home-btn"><Link to={"/"}>Algorithm Visualizer</Link></span>
                <ArrowForwardIosRoundedIcon className='arrow' />
                <span className="current-page">{this.props.currentPage}</span>

                {
                    (this.props.info) &&
                    <Link to={`/${this.props.info}`}title="More Information">
                        <Button><InfoIcon color="action" /></Button>

                    </Link>
                }
                {
                    (this.props.visualizer) &&
                    <Link to={`/${this.props.visualizer}`}title="Open Visualizer">
                        <Button><GraphicEqIcon color="action" /></Button>
                    </Link>
                }
            </nav>
        );
    }
}



export default Navbar;