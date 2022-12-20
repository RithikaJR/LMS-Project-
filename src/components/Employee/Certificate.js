
import React, { Component } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import Certificatepng from '../images/Certificatepng.png';
import classes from "./Certificate.module.css";


class Certificate extends Component{
  certificateWrapper = React.createRef();
  state = {
    Name: "",
    course:""
  };
  render() {
    return (
      <div className={classes.app}>
        <div className={classes.meta}>
          <h1>Certificate</h1>
      
          <button
            onClick={(e) => {
              e.preventDefault();
              exportComponentAsPNG(this.certificateWrapper);
              
            }}
          >
            
            Download
          </button>
        </div>

        <div className={classes.downloadWrapper } ref={this.certificateWrapper}>
          <div className={classes.certificateWrapper}>
            <p1>{this.state.Name}</p1>
            <p2> {this.state.course}</p2>
           
            <img src={Certificatepng}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Certificate;

