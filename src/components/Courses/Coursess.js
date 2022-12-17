import React from "react";
import AvailableCourses from "./AvailableCourses";
import classes from "./Courses.module.css";
import Search from "../Search Bar/Search.js";

import MainHeaderLA from "../MainHeader/MainHeaderLA";
import NavigationLA from "../MainHeader/NavigationLA";

const Coursess = () => {
    return (
        <div className={classes.coursepage}>
            {/* <EmployeesHome></EmployeesHome> */}
            <MainHeaderLA></MainHeaderLA>
            <NavigationLA></NavigationLA>
            <h1>Courses</h1>
                <AvailableCourses />

         
        </div>
    
    );
};

export default Coursess;