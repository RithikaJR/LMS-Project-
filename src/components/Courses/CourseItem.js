import { useContext } from 'react';
import classes from './CourseItem.module.css';
import slide_image4 from '../images/slide_image4.jpg';
import Button from '../UI/Button/Button';
import { NavLink } from 'react-router-dom';
import CourseInterface from './CourseInterface';


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
          <img src={props.image}/>
        </div>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>Course Description : {props.description}</div>
          <div className={classes.view}><NavLink to = "/courseinterface" ><Button>Modules</Button></NavLink></div>
        </div>
        
      </li>
    );
  };
  // <NavLink to = "/courseinterface" ><Button>Modules</Button></NavLink>
  // {props.url}
  
  export default CourseItem;
  