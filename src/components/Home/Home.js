import React from 'react';
import AvailableCourses from '../Courses/AvailableCourses';
import Courses from '../Courses/Courses';

import Card from '../UI/Card/Card';
import UserTab from '../UserTabs/UserTab';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
        <h1>Welcome Pratheep!</h1>
        <h4>You are THE SUPER ADMIN!!</h4>
        <Courses/>
      </div>
      <div className={classes.logolinks}>
        <ul>
          <li>
            <a href='users'>
              {/* <img src='D:\Edits\lms_with_login\src\components\images\user_logo.png'/> */} <h6>Users</h6>
            </a>
          </li>
          <li>
            <a href='courses'>
              
  
              {/* <img src='D:\Edits\lms_with_login\src\components\images\course_logo.png'/> */} <h6>Courses</h6>
            </a>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Home;
