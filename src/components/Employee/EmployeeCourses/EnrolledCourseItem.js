import { useContext } from 'react';
import classes from './EmployeeCourseItem.module.css';
// import slide_image4 from '../../images/slide_image4.jpg';
import Button from '../../UI/Button/Button';
import { NavLink } from 'react-router-dom';
import CourseInterface from './EmployeeCourseInterface';
import Modal from '../../UI/Modal/Modal';
import { useState } from 'react';
import TickImage from '../../images/tick.png'


const EnrolledCourseItem = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [view, setView] = useState(false);
  
  const propsHandler =()=>{
    sessionStorage.setItem("courseId",props.id);
    sessionStorage.setItem("coursename", props.name);
    sessionStorage.setItem("courseDuration",props.duration);
  }

    console.log("CourseItem"+props.id);
    console.log("coursename"+props.name);
    return (
      <li className={classes.courses}>
        <div className={classes.courseimg}>
          <img src={props.image}/>
        </div>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>Course Description : {props.description}</div>
          <div className={classes.view}><NavLink to={{pathname:'/employee/course-module',state:{course_name:props.name, enrollId:props.enrolledCourseId}}}><Button onClick={propsHandler}>View</Button></NavLink></div>
          
        </div>
      </li>
    );
  };
  
  export default EnrolledCourseItem;
  