import classes from './LearningAdminHome.module.css';
import React from 'react';
import AvailableCourses from '../Courses/AvailableCourses';
import Courses from '../Courses/Courses';

import user_logo from '../images/user_logo.png';
import course_logo from '../images/course_logo.png';
import { NavLink } from 'react-router-dom';
const LearningAdminHome=(props)=>{
    return(
        <div className={classes.learningAdminHome}>
        <div className={classes.writeup}>
          { <h1>Welcome {props.name}!</h1> }
          {/* <h4>You are THE SUPER ADMIN!!</h4> */}
          
        </div>
        
        <div className={classes.logolinks}>
          <ul>
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

export default LearningAdminHome;