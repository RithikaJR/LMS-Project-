import React from 'react';
import AvailableCourses from '../Courses/AvailableCourses';
import Courses from '../Courses/Courses';

import Card from '../UI/Card/Card';
// import UserTab from '../UserTabs/UserTab';
import classes from './SuperAdminHome.module.css';
import user_logo from '../images/user_logo.png';
import course_logo from '../images/course_logo.png';
import { NavLink } from 'react-router-dom';

const SuperAdminHome = (props) => {
  return (
    <div className={classes.home}>      
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

          <li>
            <NavLink to ='/reports' className={classes.coursetext}> 
            <div className={classes.image_wrap}>
              <img src={course_logo} className={classes.course}/>
            </div >
              <h4>Reports</h4>
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
