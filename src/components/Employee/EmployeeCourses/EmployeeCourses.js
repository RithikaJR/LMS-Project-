import React, { useState } from "react";
import EmployeeAvailableCourses from "./EmployeeAvailableCourses";
import classes from "./EmployeeCourses.module.css";


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
                <h1>Courses</h1>
            </div>
            <EmployeeAvailableCourses employeeId={props.employeeId} />
        </div>

        
    
    );
};

export default EmployeeCourses;