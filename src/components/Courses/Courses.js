import React, { useState } from "react";
import AvailableCourses from "./AvailableCourses";
import classes from "./Courses.module.css";
import Button from '../UI/Button/Button.js';
import Modal from "../UI/Modal/Modal.js";
import AddCourseForm from "../Courses/Add Course/AddCourseForm.js"
import AddSessionForm from "./Add Course/AddSessionForm";
import close from '../images/blue_close.png';


const Courses = () => {

  const [cartIsShown, setCartIsShown] = useState(false);
  const [newCartIsShown, setNewCartIsShown] = useState(false);
  const [buttonIsShown, setButtonIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showNewCartHandler = () => {
    setNewCartIsShown(true);
  };

  const hideNewCartHandler = () => {
    
    setNewCartIsShown(false);
  };

  const buttonHandler = () => {
    if(buttonIsShown === false){
      setButtonIsShown(true);
    }
    else if(buttonIsShown === true) {
      setButtonIsShown(false);
    }
    
  }


    return (
        <div className={classes.coursepage}>
            <div className={classes.box}>
                <h1>Courses</h1>
                <div className={classes.add}>
                  <Button onClick={buttonHandler}>Add +</Button>
                </div>
                {buttonIsShown &&
                <div className={classes.add}>
                  <div>
                    <Button onClick={buttonHandler}>Add +</Button>
                  </div>
                  <div className={classes.display}>
                    <div className={classes.options}>
                      <Button onClick={showCartHandler}>Add Course</Button>
                    </div>
                    <div className={classes.options}>
                      <Button onClick={showNewCartHandler}>Add Session</Button>
                    </div>
                </div>
                </div>}

                {cartIsShown && 
                <Modal onClose={cartIsShown} >
                  <div className={classes.close}>
                    <Button onClick={hideCartHandler}><img src={close}/></Button>
                  </div>
                  <AddCourseForm></AddCourseForm>
                </Modal>
                }
                </div>

                {newCartIsShown && 
                <Modal onClose={newCartIsShown} >
                  <div className={classes.close}>
                    <Button onClick={hideNewCartHandler}><img src={close}/></Button>
                  </div>
                  <AddSessionForm />
                </Modal>}
            <AvailableCourses />
        </div>
        
    
    );
};

export default Courses;