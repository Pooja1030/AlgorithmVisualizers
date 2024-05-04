import React, {Component} from 'react';
// import MyTimer from "./timer";
import Canvas from "./canvas";
import Navbar from '../Components/navbar';
import Menu from "./menu";
// import SidePanel from './sidepanelh';

class ConvexHull extends Component {
    state={
        dots:[],
        lines:[],
        isALgoLive:false,
        width:100,
        height:100,
        isRunning:false,
        speed:100,
        number:50,
        // sidePanelOpen: false, // State to manage side panel visibility
        // algorithmSteps: [
        //     // Define your algorithm steps here
        //     { description: 'Step 1: Describe the first step' },
        //     { description: 'Step 2: Describe the second step' },
        //     { description: 'Step 3: Describe the third step' }
        // ],

    }
    constructor() {
        super();
        this.setState({width:window.innerWidth,height:window.innerHeight-200});
    }
    componentDidMount() {
        this.setState({
            width:window.innerWidth,
            height:window.innerHeight-100, 
            dots:getNewDots(this.state.number)});
    }
    render() {
        return (
            <div>
                <Navbar currentPage="Convex Hull"/>
                 {/* Side panel toggle button */}
                 {/* <button className="side-panel-toggle" onClick={this.toggleSidePanel}>
                    →
                </button> */}

                {/* Render the side panel component */}
                {/* <SidePanel isOpen={this.state.sidePanelOpen} onClose={this.toggleSidePanel} algorithmSteps={this.state.algorithmSteps} /> */}

                
                <Menu
                    onRefresh={this.handleRefreshDots}
                    onVisualize={this.handleVisualize}
                    onChangeSpeed={this.changeSpeed}
                    onChangeValues={this.handleValueIncease}
                />
                <Canvas
                    width={this.state.width}
                    height={this.state.height}
                    dots={this.state.dots}
                    onTurnOff={this.handleTurnOff}
                    onGoing={this.state.isRunning}
                    speed={this.state.speed}
                />
            </div>
        );
    }
    handleValueIncease = (value) => {
        this.setState({number:value});
        this.handleRefreshDots();
    }
    changeSpeed = (speed) => {
        //console.log(typeof speed);
        this.setState({speed:600-speed*10});
    }
    handleAlgoStateChanged = (val) => {
        this.setState({isAlgoLive:val});
    }
    handleVisualize = () =>{
        this.setState({isRunning:true});
    }
    handleTurnOff = () =>{
        this.setState({onGoing:false});
    }
    handleRefreshDots = () =>{
        this.setState({isRunning:false});
        this.setState({dots:getNewDots(this.state.number)});
    }

    handleMoreDot = () =>{
        const row = Math.floor(Math.random()*400)+10;
        const col = Math.floor(Math.random()*400)+10;
        const dot = {
            row:row,
            col:col
        }
        const dots = this.state.dots;
        dots.push(dot);
        this.setState(dots);
    }
}
function getNewDots(number){
    const dots= [];
    for(let  i = 0; i<number;i++){
        dots.push(getDot());
    }
    dots.sort( (a,b) => {
       if( a.xx!==b.xx ){
           return a.xx-b.xx;
       } else{
           return a.yy - b.yy;
       }
    } );
    return dots;
}
function getDot(){
    const width = window.innerWidth-50;
    const height = window.innerHeight-250;
    const rowpos = Math.floor( Math.random()*height )+25;
    const colpos = Math.floor(Math.random()*width)+25;
    return {
        xx:colpos,
        yy:rowpos,
    }
}
export default ConvexHull;