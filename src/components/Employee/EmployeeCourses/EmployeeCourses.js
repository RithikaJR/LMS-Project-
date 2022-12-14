import React, { useState } from "react";
import EmployeeAvailableCourses from "./EmployeeAvailableCourses";
import classes from "./EmployeeCourses.module.css";
import Button from '../../UI/Button/Button.js';
import Modal from "../../UI/Modal/Modal.js";
import AddCourseForm from "../../Courses/Add Course/AddCourseForm.js"


const EmployeeCourses = (props) => {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
    return (
        <div className={classes.coursepage}>
            <div className={classes.box}>
                <h1>Featured Courses</h1>
            </div>
            <EmployeeAvailableCourses employeeId={props.employeeId} />
        </div>

        
    
    );
};

export default EmployeeCourses;