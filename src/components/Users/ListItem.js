import { useContext } from 'react';
// import classes from './CourseItem.module.css';
import slide_image4 from '../images/slide_image4.jpg';
import Button from '../UI/Button/Button';


const ListItem = (props) => {
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
      <li>
        <div>
          <div>firstname : {props.employeeFirstName}</div>
          <div>lastname : {props.employeeLastName}</div>
          <div>Email : {props.employeeEmail}</div>
          {/* <div className={classes.view}><a href={props.url} target="_blank"><Button>View</Button></a></div> */}
        </div>
        
      </li>
    );
  };
  
  export default ListItem;
  