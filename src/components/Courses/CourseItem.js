import { useContext } from 'react';
import classes from './CourseItem.module.css';
import exp_logo from '../images/bg1.jpg';


const CourseItem = (props) => {
    // const cartCtx = useContext(CartContext);
  
    // const price = `$${props.price.toFixed(2)}`;
  
    // const addToCartHandler = amount => {
    //   cartCtx.addItem({
    //     id: props.id,
    //     name: props.name,
    //     amount: amount,
    //     price: props.price
    //   });
    // };
  
    return (
      <li className={classes.courses}>
        <div className={classes.courseimg}>
          <img src={exp_logo}/>
        </div>
        <div>
          <h3>Course Name: {props.name}</h3>
          <div className={classes.description}> Course Description:{props.description}</div>
          <div className={classes.price}>Url: {props.url}</div>
        </div>
        
      </li>
    );
  };
  
  export default CourseItem;
  