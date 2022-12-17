import React, { useState } from "react";
import AvailableCourses from "./AvailableCourses";
import classes from "./Courses.module.css";
import Button from '../UI/Button/Button.js';
import Modal from "../UI/Modal/Modal.js";
import AddCourseForm from "./Add Course/AddCourseForm.js"
import AssignCourse from "./Add Course/AssignCourse";


const CoursesLearningAdmin = () => {

  const [cartIsShown, setCartIsShown] = useState(false);
  const [cartIsShownLearning, setCartIsShownLearning] = useState(false);
  

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCartLearningHandler = () => {
    setCartIsShownLearning(true);
  };
  const hideCartLearningHandler = () => {
    setCartIsShownLearning(false);
  };

    return (
        <div className={classes.coursepage}>
            <div className={classes.box}>
                <h1>Courses</h1>
                <Button onClick={showCartHandler}>Add +</Button>
                <Button onClick={showCartLearningHandler}>Assign Course</Button>
                {cartIsShown && 
                <Modal onClose={cartIsShown} className={classes.close}>
                    <AddCourseForm></AddCourseForm>
                    <Button onClick={hideCartHandler}>Close</Button>
                </Modal>}

                {cartIsShownLearning && 
                <Modal onClose={cartIsShownLearning} className={classes.close}>
                 <AssignCourse></AssignCourse>
                    <Button onClick={hideCartLearningHandler}>Submit</Button>
                </Modal>}
            </div>
            <AvailableCourses />
        </div>
    
    );
};

export default CoursesLearningAdmin;