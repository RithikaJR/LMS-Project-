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
  
  // const showCartHandler = async (e) => {
  //   try {
  //     let res = await fetch("http://localhost:8080/api/enroll-course", {
  //       method: "POST",
  //       headers: {"content-type": "application/json"},
  //       body: JSON.stringify({
  //         employeeId:{
  //           employeeId:props.employeeId,
  //         },
  //         courseId:{
  //           courseId:props.id,
  //         },
  //         entrolledDate:null
  //       } ),
  //     });
  //     if (res.status === 200) {
  //       setCartIsShown(true);
  //       setView(true)
  //     } else {
  //       alert("Some error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
      
  //   };
  

  //   let hideCartHandler =()=>{
  //     setCartIsShown(false);
  //   };
  const propsHandler =()=>{
    sessionStorage.setItem("courseId",props.id);
    sessionStorage.setItem("coursename", props.name);
    sessionStorage.setItem("courseDuration",props.duration);
  }

    console.log("CourseItem"+props.id);
    console.log("coursenmae"+props.name);
    return (
      <li className={classes.courses}>
        <div className={classes.courseimg}>
          <img src={props.image}/>
        </div>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>Course Description : {props.description}</div>
          <div className={classes.view}><NavLink to={{pathname:'/employee/course-module',state:{course_name:props.name}}}><Button onClick={propsHandler}>View</Button></NavLink></div>
          
          {/* {!view && <div className={classes.view}><NavLink to={{pathname:'',state:{id:props.id}}}><Button onClick={showCartHandler}>Enroll</Button></NavLink></div> }
          {cartIsShown && <Modal>
            <div class="learn" id="learn">
                <div class="learn-header">
                    <div class="title"><image src={TickImage} alt=""/></div>
                </div>
                <div class="learn-body">Enrolled Successfully
                    <div><Button data-close-button class="close-button" onClick={hideCartHandler}>OK</Button></div>
                </div>
             </div>
            </Modal>} */}
        </div>
      </li>
    );
  };
  
  export default EnrolledCourseItem;
  