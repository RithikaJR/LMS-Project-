import { useContext } from 'react';
import classes from './ListItem.module.css';
import slide_image4 from '../images/slide_image4.jpg';
import Button from '../UI/Button/Button';


const ListItemLA = (props) => {
    
    return (
      <li>
        <div className={classes.wrap}>
          <div className={classes.element}>Batch : {props.employeeFirstName}</div>
          <div className={classes.element}>Name : {props.employeeLastName}</div>
          <div className={classes.element}>Email : {props.employeeEmail}</div>
        </div>
        
      </li>
    );
  };
  
  export default ListItemLA;
  