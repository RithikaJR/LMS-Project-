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
import EmployeeProfile from './EmployeeProfile';
import LAModal from '../UI/Modal/LAModal';


import profilepicture from '../images/profilepic.jpg';
import slide1 from '../images/slide1.jpg';
import slide2 from '../images/slide2.jpg';
import slide3 from '../images/slide3.jpg';
import slide4 from '../images/slide4.jpg';

import Avatar from 'react-avatar';
import classes from '../MainHeader/Navigation.module.css';


import { Dropdown, Image } from 'semantic-ui-react'
import {faker} from '@faker-js/faker'
import Certificate from './Certificate';
import { RiSlideshow4Fill } from 'react-icons/ri';
import Coursess from '../Courses/Coursess';
import Courses from '../Courses/Courses';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);




const EmployeeHome = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

 
  const trigger = (
    <span className={classes.avatar}>
      <Image avatar src={profilepicture}   />
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
    if(props.tracker===1){
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
         
          <h1 className='tagName'>Welcome </h1>
         
          
          <div className={classes.profilepic}>
            
                <Dropdown
                  trigger={trigger}
                  options={options}
                  pointing='top left'
                />
        </div>

        

          <h1 className='tagName'>Welcome {props.name}</h1>
          <Button className='logout' onClick={props.onLogout}>Logout</Button>
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


      <Route path="/employee/coursess" exact>
      <Courses/>
      </Route>
           
            <div>
              {/* <Button onClick={showCartHandler}>Change Password</Button> */}
              {cartIsShown && 
              <div>
                <Modal onClose={cartIsShown} onClick={showCartHandler}>
                <UserProfile name={props.name} employeeId={props.employeeId} />
                <Button onClick={hideCartHandler}>Close</Button>
                </Modal>
              </div>}
              
            </div>   
    <div>
      <Route path="/employee" exact>
            <EmployeeCourses employeeId={props.employeeId}/>
      </Route>

      <Route path="/employee/feedbackform">
            <FeedbackForm/>
      </Route>

      <Route path="/employee/certificate">
            <Certificate/>
      </Route>
      <Route path="/employee/course-module">
            <EmployeeCourseInterface/>
      </Route>

      <Route path="/employee/profile">
            <EmployeeProfile/>
      </Route>
    </div>
    </div>
    <div className='below'>
    <div className="imgWrapper">
            {images.map((img, index) => {
              return (
                <img
                  src={img}
                  className={index === currentSlide ? "imageActive homeImage" : "image" }
                />
              );
            })}
         </div>
      
    </div>
    </div>
  );
}

export default EmployeeHome;
