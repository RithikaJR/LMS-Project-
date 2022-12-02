import React, { useState } from "react";
import AvailableCourses from "./AvailableCourses";
import classes from "./Courses.module.css";
import Button from '../../UI/Button/Button.js';
import Modal from "../../UI/Modal/Modal.js";
import AddCourseForm from "../../Courses/Add Course/AddCourseForm.js"


const Courses = () => {

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
                {/* <Button onClick={showCartHandler}>Add +</Button>
                {cartIsShown && 
                <Modal onClose={cartIsShown}>
                    <AddCourseForm></AddCourseForm>
                    <Button onClick={hideCartHandler}>X</Button>
                </Modal>} */}
            </div>
            <AvailableCourses />
        </div>
    
    );
};

export default Courses;