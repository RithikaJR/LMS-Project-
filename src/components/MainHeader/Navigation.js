import React from 'react';
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
  const [overlayShown, setoverlayIsShown] = useState(false);
  
  useEffect(() => {
    if(props.tracker===1){
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
            <h1>Welcome {props.name}</h1>
          </li>
        )}
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
          <UserProfile name={props.name} employeeId={props.employeeId} />
          <Button onClick={hideCartHandler}>Close</Button>
          {/* name={props.name} employeeId={props.employeeId} */}
          </Modal>}
    </nav>
  );
};

export default Navigation;
