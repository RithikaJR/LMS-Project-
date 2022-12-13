import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Route } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import './EmployeeHome.css';
import { IconContext } from 'react-icons';
import EmployeeCourses from './EmployeeCourses/EmployeeCourses';
import FeedbackForm from './Feedbackform';
import { useEffect } from 'react';
import Button from '../UI/Button/Button';
import UserProfile from './UserProfile';
import Modal from "../UI/Modal/Modal.js";
import EmployeeCourseInterface from './EmployeeCourses/EmployeeCourseInterface';
import EnrolledCourses from './EmployeeCourses/EnrolledCourses';
import EmployeeProfile from './EmployeeProfile';
import LAModal from '../UI/Modal/LAModal';

import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
// import { Dropdown, Image } from 'semantic-ui-react'
import {faker} from '@faker-js/faker'
import image from '../images/team-male.jpg' 
// const styleLink = document.createElement("link");

// document.head.appendChild(styleLink);
const EmployeeHome = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
          {cartIsShown && <Modal onClose={cartIsShown} className="overlay">
          <UserProfile name={props.name} employeeId={props.employeeId} />
          <Button onClick={hideCartHandler}>Close</Button>
          {/* name={props.name} employeeId={props.employeeId} */}
          </Modal>}
        </div>   
      <Route path="/employee" exact>
            <EmployeeCourses employeeId={props.employeeId}/>
      </Route>

      <Route path="/employee/enrolled-courses">
            <EnrolledCourses employeeId={props.employeeId} name={props.name}/>
      </Route>

      <Route path="/employee/feedbackform">
            <FeedbackForm/>
      </Route>

      <Route path="/employee/course-module">
            <EmployeeCourseInterface/>
      </Route>

      <Route path="/employee/profile">
            <EmployeeProfile employeeId={props.employeeId} name={props.name}/>
      </Route></div>
    
  );
}

export default EmployeeHome;
