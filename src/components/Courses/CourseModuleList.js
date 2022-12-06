import Dropdown from 'react-bootstrap/Dropdown';
// import { Dropdown } from 'bootstrap';
import Button from '../UI/Button/Button';
import classes from './CourseModuleList.module.css';
import './ColapStyle.css';
import Collapsible from 'react-collapsible';
import ModuleResource from './ModuleResource';

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
    const handleVideo = ()=>{
      props.videoLink(props.pdf);
    }


    console.log(props.id);
    console.log(props.name);
    console.log(props.footage);
    console.log(props.pdf);
    console.log(props.moduleType);

    return (
      <div className={classes.wrap}>
          <Collapsible trigger={props.name} className={classes.collapse}>
            <ul>
              <li>
                {/* <a onClick={handleVideo}> Video </a> */}
                <ModuleResource 
                // videoLink1 = {videoLinkHandler}
                />
              </li>
              {/* <li>
                <a href={props.pdf} target="_blank"> Resources </a>
              </li> */}
            </ul>
          </Collapsible>

      </div> 
    );
}

export default CourseModuleList;