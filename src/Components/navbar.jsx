import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <span className="home-btn"><Link to={"/"}>Algorithm Visualizer</Link></span>
                <ArrowForwardIosRoundedIcon className='arrow'/>
                <span className="current-page">{this.props.currentPage}</span>
            </nav>
        );
        // return (
        //     <nav className="navbar">
        //         <IconButton
        //             edge="start"
        //             color="inherit"
        //             aria-label="menu"
        //             onClick={this.props.toggleDrawer}
        //         >
        //             <MenuIcon />
        //         </IconButton>
        //         <span className="home-btn"><Link to={"/"}>Algorithm Visualizer</Link></span>
        //         <ArrowForwardIosRoundedIcon className='arrow' />
        //         <span className="current-page">{this.props.currentPage}</span>
        //     </nav>
        // );
    }    }



export default Navbar;