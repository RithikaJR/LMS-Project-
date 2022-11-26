import classes from './CourseItem.module.css';
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
      <li className={classes.courses}>
        <div className={classes.courseimg}>
          <img src={props.image}/>
        </div>
        <div>

          <h3>{props.name}</h3>
          <div className={classes.description}>Course Description : {props.description}</div>
          <div className={classes.view}><a href={props.url}>Video Link</a></div>
          {/* onClick={addToCartHandler} */}
          {/* //<NavLink to='/courses/course-module'><Button>View</Button></NavLink> */}
        </div>
        
      </li>
    );
}

export default CourseModuleList;