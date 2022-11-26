import React from "react";
import AvailableCourses from "./AvailableCourses";
import classes from "./Courses.module.css";
import Search from "../Search Bar/Search.js";

const Courses = () => {
    return (
        <div className={classes.coursepage}>
            <h1>Courses</h1>
            <AvailableCourses />
        </div>
    
    );
};

export default Courses;