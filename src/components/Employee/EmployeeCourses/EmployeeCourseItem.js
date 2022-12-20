import { useContext } from 'react';
import classes from './EmployeeCourseItem.module.css';
// import slide_image4 from '../../images/slide_image4.jpg';
import Button from '../../UI/Button/Button';
import { NavLink } from 'react-router-dom';
import CourseInterface from './EmployeeCourseInterface';
import Modal from '../../UI/Modal/Modal';
import { useState } from 'react';
import TickImage from '../../images/tick.png'


const EmployeeCourseItem = (props) => {
  let Username = localStorage.getItem('LoggedName');

  const [cartIsShown, setCartIsShown] = useState(false);
  const [view, setView] = useState(false);

  const showCartHandler = async (e) => {
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    console.log("employeeId:"+props.employeeId)
    console.log("employeeName:"+Username)
    console.log("courseId:"+props.id)
    console.log("courseName:"+props.name)
    try {
      let res = await fetch("http://localhost:8080/api/course-approval", {
        method: "POST",
        headers: {"content-type": "application/json" ,'Authorization':token},
        body: JSON.stringify({
            employeeId:props.employeeId,
            employeeName:Username,
            courseId:props.id,
            courseName:props.name,
            
        } ),
      });
      if (res.status === 201) {
        setCartIsShown(true);
        setView(true)
      } else {
        alert("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }    
    };
  

    let hideCartHandler =()=>{
      setCartIsShown(false);
    };

    console.log("CouresItem"+props.id);
    return (
    <div>
      {/* {props.currentItem &&
      props.currentItem.map((item)=>( */}
      <li className={classes.courses}>
          <div className={classes.courseimg}>
            <img src={props.image}/>
          </div>
          <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>Course Description : {props.description}</div>
            {view && <div className={classes.view}><NavLink to={{pathname:'/employee/course-module',state:{id:props.id}}}><Button >View</Button></NavLink></div>}
            
            {!view && <div className={classes.view}><NavLink to={{pathname:'',state:{id:props.id}}}><Button onClick={showCartHandler}>Enroll</Button></NavLink></div> }
            {cartIsShown && <Modal>
              <div class="learn" id="learn">
                  <div class="learn-header">
                      <div class="title"><image src={TickImage} alt=""/></div>
                  </div>
                  <div class="learn-body">Enroll Request Sent
                      <div><Button data-close-button class="close-button" onClick={hideCartHandler}>OK</Button></div>
                  </div>
              </div>
              </Modal>}
          </div>
        </li>
        {/* ))} */}
      </div>
    );
  };
  
  export default EmployeeCourseItem;
  