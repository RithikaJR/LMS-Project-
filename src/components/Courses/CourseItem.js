import { useContext } from 'react';
import classes from './CourseItem.module.css';
import slide_image4 from '../images/slide_image4.jpg';
import Button from '../UI/Button/Button';
import { NavLink } from 'react-router-dom';
import edit from '../images/edit_icon.png';
import delet from '../images/delete_icon.png';


const CourseItem = (props) => {
    

    console.log("CouresItem"+props.id);
    return (
      <li className={classes.courses}>
        <div className={classes.courseimg}>
          <img src={props.image}/>
        </div>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>Course Description : {props.description}</div>
          <div className={classes.view}>
            <NavLink to={{pathname:'/courses/course-module',state:{id:props.id}}}><Button >View</Button></NavLink>
            <Button><img src={edit}/></Button>
            <Button><img src={delet}/></Button>
          </div>
         
        </div>
        
      </li>
    );
  };
  
  export default CourseItem;
  