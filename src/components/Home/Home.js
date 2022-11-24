import React from 'react';
import AvailableCourses from '../Courses/AvailableCourses';
import Courses from '../Courses/Courses';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import user_logo from '../images/user_logo.png';
import course_logo from '../images/course_logo.png';

const Home = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
        <h1>Welcome Pratheep!</h1>
        <h4>You are THE SUPER ADMIN!!</h4>
        
      </div>
      
      {/* <div className={classes.logolinks}>
        <ul>
          <li>
            <a href='users'>
              <img src={user_logo}/>
            </a>
          </li>
          <li>
            <a href='courses'>
              
  
              <img src={course_logo}/>
            </a>
          </li>
        </ul>
      </div> */}
      <Courses/>

    </div> 
  );
};

export default Home;
