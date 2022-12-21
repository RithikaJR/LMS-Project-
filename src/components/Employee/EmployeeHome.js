import React, { useState,useRef,useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Route } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './EmployeeHome.css';
import { IconContext } from 'react-icons';
import EmployeeCourses from './EmployeeCourses/EmployeeCourses';
import FeedbackForm from './Feedbackform';
import Button from '../UI/Button/Button';
import UserProfile from './UserProfile';
import Modal from "../UI/Modal/Modal.js";
import EmployeeCourseInterface from './EmployeeCourses/EmployeeCourseInterface';
import EnrolledCourses from './EmployeeCourses/EnrolledCourses';
import EmployeeProfile from './EmployeeProfile';
import profilepicture from '../images/profilepic.jpg';
import slide1 from '../images/slide1.jpg';
import slide4 from '../images/slide4.jpg';
import classes from '../MainHeader/Navigation.module.css';
import Certificate from './Certificate';
import { RiSlideshow4Fill } from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import image from '../images/team-male.jpg' 
import close from '../images/blue_close.png';

// document.head.appendChild(styleLink);
// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href =
// "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);



const EmployeeHome = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

 
  const trigger = (
    <span className={classes.avatar}>
      <img src={profilepicture}   />
      {'justin'}
     </span>

  )

  const options = [
    
    { key: 'settings', text: 'Status: active'},
    { key: 'sign-out', text: 'Log Out'},
  ]

  const images = [slide1,slide4];
  const [currentSlide, setCurrentSlide] = useState(0);
  // useRef does not cause a re-render
  let sliderInterval = useRef();
  let switchImages = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };
  useEffect(() => {
    sliderInterval = setInterval(() => {
      switchImages();
    }, 5000);
    return () => {
      clearInterval(sliderInterval);
    };
  });

  
  const [cartIsShown, setCartIsShown] = useState(false);
  useEffect(() => {
    if(props.tracker===false){
      setCartIsShown(true);
    }else{
      setCartIsShown(false);
    }
   
  },[]);
    const showCartHandler = () => {
      setCartIsShown(true);
    };
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    };

  return (
  <div>
    <div className= "employee">
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
         
          {/* <h1 className='tagName'>Welcome </h1> */}
         
          
          <div className={classes.profilepic}>
            
                <Dropdown
                  trigger={trigger}
                  options={options}
                  pointing='top left'
                />
        </div>

        

          <h1 className='tagName'>Welcome {props.name}</h1>
          <Dropdown>
            <Dropdown.Toggle variant="" className='avatar'>
            <img src={image} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className='menu' href="/employee">
                Home Page
              </Dropdown.Item>
              <Dropdown.Item className='menu'href="#" onClick={showCartHandler}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item className='menu' href="#" onClick={props.onLogout}>
              Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        
         
      </IconContext.Provider>
          {cartIsShown && 
          <Modal onClose={cartIsShown} className="overlay">
            <div className='close_employee'>
              <Button onClick={hideCartHandler}><img src={close}/></Button>
            </div>
          <UserProfile name={props.name} employeeId={props.employeeId} userId={props.userId} />
          </Modal>}
        </div>   
      <Route path="/employee" exact>
            <EmployeeCourses employeeId={props.employeeId}/>
      </Route>

      <Route path="/employee/enrolled-courses">
            <EnrolledCourses employeeId={props.employeeId} name={props.name}/>
      </Route>

      <Route path="/employee/feedbackform">
            <FeedbackForm employeeId={props.employeeId} name={props.name}/>
      </Route>

      <Route path="/employee/certificate">
            <Certificate/>
      </Route>
      <Route path="/employee/course-module">
            <EmployeeCourseInterface/>
      </Route>

      <Route path="/employee/profile">
            <EmployeeProfile employeeId={props.employeeId} name={props.name} userId={props.userId}/>
      </Route></div>
    
  );
}

export default EmployeeHome;
