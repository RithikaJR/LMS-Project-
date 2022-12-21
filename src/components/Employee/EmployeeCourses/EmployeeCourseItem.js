import { useContext } from 'react';
import classes from './EmployeeCourseItem.module.css';
import Button from '../../UI/Button/Button';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';


const EmployeeCourseItem = (props) => {
  let Username = localStorage.getItem('LoggedName');
  let EmailId= localStorage.getItem('LoggedEmail');

  const [cartIsShown, setCartIsShown] = useState(false);
  const [view, setView] = useState(false);

  const showCartHandler = async (e) => {
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    console.log("employeeId:"+props.employeeId)
    console.log("employeeName:"+Username)
    console.log("courseId:"+props.id)
    console.log("courseName:"+props.name)
    console.log("EmailId:"+EmailId)
    console.log("course Duration"+props.course_duration)

    try {
      let res = await fetch("http://localhost:8080/api/course-approval", {
        method: "POST",
        headers: {"content-type": "application/json" ,'Authorization':token},
        body: JSON.stringify({
            employeeId:props.employeeId,
            employeeName:Username,
            courseId:props.id,
            courseName:props.name,
            employeeEmail:EmailId,
        } ),
      });
      if (res.status === 201) {
        setCartIsShown(true);
        setView(true)
        alert("Enroll request Sent")
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
      <li className={classes.courses}>
          <div className={classes.courseimg}>
            <img src={props.image}/>
          </div>
          <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>Course Description : {props.description}</div>
            {view && <div className={classes.view}><Button disabled>Requested</Button></div>}
            
            {!view && <div className={classes.view}><NavLink to={{pathname:'',state:{id:props.id}}}><Button onClick={showCartHandler}>Enroll</Button></NavLink></div> }
          </div>
        </li>
      </div>
    );
  };
  
  export default EmployeeCourseItem;
  