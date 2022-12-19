import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../images/notification bell.png';


import Notification from '../Notification/Notification';



import classes from './Navigation.module.css';

import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import image from '../images/team-male.jpg' 
import Button from '../UI/Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import UserProfile from '../Employee/UserProfile';
import Modal from '../UI/Modal/Modal';

const Navigation = (props) => {
  let Username = localStorage.getItem('LoggedName');
  const [overlayShown, setoverlayIsShown] = useState(false);
  console.log("userId"+props.userId)
  
  useEffect(() => {
    if(props.tracker===false){
      setoverlayIsShown(true);
    }else{
      setoverlayIsShown(false);
    }
   
  },[]);

  const showCartHandler = () => {
    setoverlayIsShown(true);
  };

  const hideCartHandler = () => {
    setoverlayIsShown(false);
  };
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <h1>Welcome {Username}</h1>
          </li>
        )}
        
      
          <li>
            <NavLink to = '/notification' className={classes.usertext}>
            <div className={classes.bell}>
              <img src={icon}/>
              </div>
            </NavLink>
          </li>
        
        {props.isLoggedIn && (
          <li className='avatar'>
            {/*  <Button className='logout' onClick={props.onLogout}>Logout</Button>  */}
            <Dropdown>
            <Dropdown.Toggle variant="">
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
          </li>
        )}

      </ul>
      {overlayShown && <Modal onClose={overlayShown} className="overlay">
          <UserProfile name={props.name} employeeId={props.employeeId} userId={props.userId} />
          <Button onClick={hideCartHandler}>Close</Button>
          {/* name={props.name} employeeId={props.employeeId} */}
          </Modal>}
    </nav>
  );
};

export default Navigation;
