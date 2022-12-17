import React from 'react';
import AvailableCourses from '../Courses/AvailableCourses';
import Courses from '../Courses/Courses';

import Card from '../UI/Card/Card';
// import UserTab from '../UserTabs/UserTab';
import classes from './Home.module.css';
import user_logo from '../images/user_logo.png';
import course_logo from '../images/course_logo.png';
import { NavLink } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import MainHeaderLA from '../MainHeader/MainHeaderLA';

import  { useState } from "react"
import CoursesLearningAdmin from '../Courses/CoursesLearningAdmin';



const HomeLearningAdmin = (props) => {

  const [navbarOpen, setNavbarOpen] = useState(false)
    

    return (
      
      <div> 
      <MainHeaderLA></MainHeaderLA>     
        <div className={classes.logolinks}>
          <ul>
            <li>
              <NavLink to = "/userslearningadmin" className={classes.usertext}>
                <div className={classes.image_wrap}>
                {/* <img src={user_logo}/> */}
                </div>
                <h4>Users</h4>
              </NavLink>

              
              
            </li>
  
            {/* <li>
              <NavLink to ='/courseslearningadmin' className={classes.coursetext}> 
              <div className={classes.image_wrap}>
                <img src={course_logo} className={classes.course}/>
              </div >
                <h4>Courses</h4>
              </NavLink>
            </li> */}
  
          
          </ul>
        </div>

        <CoursesLearningAdmin/>
  
      </div> 
      
      
      
 
    );
  };
  

  
  export default HomeLearningAdmin;