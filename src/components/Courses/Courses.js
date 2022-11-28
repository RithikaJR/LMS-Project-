import React from "react";
import AvailableCourses from "./AvailableCourses";
import classes from "./Courses.module.css";
import Search from "../Users/Search";

const Courses = () => {
    return (
        <div className={classes.coursepage}>
            <h1>Courses</h1>
            <Search/>
         <AvailableCourses/>
        </div>
    
    );
};

export default Courses;