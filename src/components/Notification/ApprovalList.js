import { useContext } from 'react';
import classes from '../Users/ListItem.module.css';
import slide_image4 from '../images/slide_image4.jpg';
import Button from '../UI/Button/Button';


const ApprovalList = (props) => {
    
    return (
      <li>
        <div className={classes.wrap}>
          <div className={classes.element}>Name : {props.employeeName}</div>
          {/* <div className={classes.element}>Lastname : {props.employeeLastName}</div> */}
          <div className={classes.element}>CourseName: {props.courseName}</div>
        </div>
        
      </li>
    );
  };
  
  export default ApprovalList;