import React, { useEffect, useState } from 'react';
import AvailableCourses from '../Courses/AvailableCourses';
import Courses from '../Courses/Courses';
import Modal from "../UI/Modal/Modal.js";
import Card from '../UI/Card/Card';
// import UserTab from '../UserTabs/UserTab';
import classes from './SuperAdminHome.module.css';
import user_logo from '../images/user_logo.png';
import course_logo from '../images/course_logo.png';
import { NavLink } from 'react-router-dom';
import Button from '../UI/Button/Button';
import UserProfile from '../Employee/UserProfile';

const SuperAdminHome = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);
  useEffect(() => {

    if(props.tracker===1){
      setCartIsShown(true);
    }else{
      setCartIsShown(false);
    }
   
  },[]);


    const showCartHandler = () => {
      setCartIsShown(true);
    };
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    };
  return (
    <div className={classes.home}>   
          <div>
              {/* <Button onClick={showCartHandler}>Change Password</Button> */}
              {cartIsShown && <Modal onClose={cartIsShown}>
              <UserProfile name={props.name} employeeId={props.employeeId} />
              <Button onClick={hideCartHandler}>Close</Button>
              {/* name={props.name} employeeId={props.employeeId} */}
              </Modal>}
          </div>   
      <div className={classes.logolinks}>
        <ul>
          <li>
            
          </li>
          <li>
            <NavLink to = "/users" className={classes.usertext}>
              <div className={classes.image_wrap}>
              <img src={user_logo}/>
              </div>
              <h4>Users</h4>
            </NavLink>
            
          </li>

          <li>
            <NavLink to ='/courses' className={classes.coursetext}> 
            <div className={classes.image_wrap}>
              <img src={course_logo} className={classes.course}/>
            </div >
              <h4>Courses</h4>
            </NavLink>
          </li>


        
        </ul>
      </div>

    </div> 
  );
};

// const textstyle = {
//   color: "black",
//   textAlign: "center",
//   textdecoration: "none"
// };

export default SuperAdminHome;
