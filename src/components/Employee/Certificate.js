
import React, {useState} from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import Certificatepng from '../images/Certificatepng.png';
import classes from "./Certificate.module.css";
 
const Certificate = () => {

  const [certificateWrapper, setdata] = useState({
       Name: "vf",
      course:""})
 
  
  return (
    <div className={classes.app}>
      <div className={classes.meta}>
        <h1>Certificate</h1>
    
        <button
          onClick={(e) => {
            e.preventDefault();
            
            exportComponentAsPNG(certificateWrapper);
          }}
        > 
          Download
        </button>
      </div>

      <div className={classes.downloadWrapper } ref={certificateWrapper}>
        <div className={classes.certificateWrapper}>
          <p1>{certificateWrapper.Name}</p1>
          <p2>{certificateWrapper.course}</p2>
         
          <img src={Certificatepng}/>
        </div>
      </div>
    </div>
  );
  
        }

export default Certificate;

