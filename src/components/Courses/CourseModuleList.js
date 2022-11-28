import Dropdown from 'react-bootstrap/Dropdown';
// import { Dropdown } from 'bootstrap';
import Button from '../UI/Button/Button';
import classes from './CourseModuleList.module.css';

import Collapsible from 'react-collapsible';
const CourseModuleList = (props) =>{
// const caurseCtx = useContext(CourseContext);
  
//     // const price = `$${props.price.toFixed(2)}`;
  
//     const addToCartHandler = () => {
//       caurseCtx.addItem({
//         id:props.id,
//         name:props.name,
//         image:props.image,
//         description:props.description
//     });
//     };
  
    // const buttonClick =() =>{
    //   <CourseModule/>
    // }
    



    console.log(props.url)
    return (
  <div>
    <Collapsible trigger={props.name} className={classes.collapse}>
      <a href={props.url}>
          Video Link
      </a>
    </Collapsible>
    {/* <div>
    <iframe width="420" height="315" src="https://www.youtube.com/embed/watch?v=9UiRlOiqxTM" frameborder="0" allowfullscreen></iframe>
    </div> */}

    </div>
   

      // <li className={classes.courses}>
      //   <div className={classes.total_wrap}>
      //     {/* <div className={classes.courseimg}>
      //       <img src={props.image}/>
      //     </div> */}
      //     <div className={classes.text_wrap}>

      //     <div class={classes.dropdown}>
      //     <div className={classes.something}>
      //       <h3>{props.name}</h3>
      //     <button onclick="myFunction()" class={classes.dropbtn}>click here</button>
      //     </div>
      //     <div id="myDropdown" class={classes.dropdown_content}>
      //     <a href={props.url}>Watch Video</a>
      //     <a href="#about">About</a>
      //     <a href="#contact">Contact</a>
      //     </div>
       
      //   </div> 

      //       {/* <h3>{props.name}</h3> */}
      //       {/* <div className={classes.description}>Course Description : {props.description}</div> */}
      //       {/* <div className={classes.view}><a href={props.url}><button>👇</button  ></a></div> */}
      //     {/* onClick={addToCartHandler} */}
      //     {/* //<NavLink to='/courses/course-module'><Button>View</Button></NavLink> */}

      //     </div>
      //   </div>        
      // </li>
      

      
    );
}

export default CourseModuleList;