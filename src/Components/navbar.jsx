import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <span className="home-btn"><Link to={"/"}>Algorithm Visualizer</Link></span>
                <ArrowForwardIosRoundedIcon className='arrow' />
                <span className="current-page">{this.props.currentPage}</span>

                {
                    (this.props.info) &&
                    <Link to={`/${this.props.info}`}>
                        <button>Info</button>
                    </Link>
                }
                {
                    (this.props.visualizer) &&
                    <Link to={`/${this.props.visualizer}`}>
                        <button>Visualizer</button>
                    </Link>
                }
            </nav>
        );
    }
}



export default Navbar;