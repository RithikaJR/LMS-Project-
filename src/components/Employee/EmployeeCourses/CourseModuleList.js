import Dropdown from 'react-bootstrap/Dropdown';
// import { Dropdown } from 'bootstrap';
import Button from '../../UI/Button/Button';
import classes from './CourseModuleList.module.css';
import './ColapStyle.css';
import Collapsible from 'react-collapsible';
import video from '../../video/sample_video.mp4';
// import sample_video from 'https://drive.google.com/file/d/19aJicg0EDYGpdsmD4hCGrDC1vGWKg12C/view?usp=share_link';


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
    const handlVideo = ()=>{
      props.videoLink(video);
    }


    // console.log(props.url)
    return (
      <div className={classes.wrap}>
          <Collapsible trigger={props.name} className={classes.collapse}>
            <ul>
              <li>
                <a onClick={handlVideo}> Video </a>
              </li>
              <li>
                <a href="https://www.tutorialspoint.com/effective_communication/effective_communication_tutorial.pdf" target="_blank"> Resources </a>
              </li>
            </ul>
          </Collapsible>

      </div> 
    );
}

export default CourseModuleList;