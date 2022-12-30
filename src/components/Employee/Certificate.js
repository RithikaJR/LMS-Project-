import React, {useState} from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import image from '.././images/course_certificate.png';
import Button from "../UI/Button/Button";
import classes from "./Certificate.module.css";
 
const Certificate = (props) => {
  const [certificateWrapper, setdata] = useState({
       Name: props.name,
       course:props.courseName
      })

  let date_1 = new Date().toLocaleString();
  let arr = date_1.split(",");
  let date = arr[0];

 

  return (
    <div className={classes.app}>
      <div className={classes.meta}>
        <h1>Certificate</h1>
      </div>

      <div className={classes.downloadWrapper}>
        <div className={classes.certificateWrapper} ref={certificateWrapper}>
          <p1>{certificateWrapper.Name}</p1>
          <p2>{props.courseName}</p2>
          <p3>{date}</p3>
     
          <img src={image} />

        </div>
      </div>
      <div>
        <Button
            onClick={(e) => {
              e.preventDefault();
              
              exportComponentAsPNG(certificateWrapper);
            }}>
            Download
          </Button>
      </div>
      
    </div>

  );
}



export default Certificate;