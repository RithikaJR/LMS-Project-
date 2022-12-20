import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../images/notification bell.png';
import icon_notify from '../images/notification bell_notify.png';
import classes from './Navigation.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './Nav-Dropdown.css';
import image from '../images/team-male.jpg' 
import Button from '../UI/Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import UserProfile from '../Employee/UserProfile';
import Modal from '../UI/Modal/Modal';

const Navigation = (props) => {
  const [overlayShown, setoverlayIsShown] = useState(false);
  const [notify, setNotify] = useState(false);
  
  useEffect(() => {
    if(props.tracker===1){
      setoverlayIsShown(true);
    }else{
      setoverlayIsShown(false);
    }

    setNotify(true);
   
  },[]);

  const showCartHandler = () => {
    setoverlayIsShown(true);
  };

  const hideCartHandler = () => {
    setoverlayIsShown(false);
  };

  const notificationHandler = () => {
    if(notify == true){
      setNotify(false);
    }
    else{
      setNotify(true);
    }
  }

  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <h1>Welcome {props.name}</h1>
          </li>
        )}
        
      
          {/* <li>
            <NavLink to = '/notification' className={classes.usertext}>
            <div className={classes.bell}>
              <img src={icon}/>
              </div>
            </NavLink>
          </li> */}

          <li className={classes.notify}>
          <Dropdown>
            <Dropdown.Toggle variant="" className='toggle'>
              {notify ? 
              <img src={icon_notify}/> :
              <img src={icon}/>}
            </Dropdown.Toggle>
            <Dropdown.Menu className='menu'>
              <Dropdown.Item>
                <div className='item'>
                  <NavLink to='/notification'>
                    <h5>You have <span className={classes.number}>{}3</span> new approvals</h5>
                  </NavLink>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className='menu'>
                <div className='item'>
                  <NavLink to='/feedbacks' className='navv'>
                    <h5>You have <span className={classes.number}>{}5</span> new feedbacks</h5>
                  </NavLink>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </li>
        
        {props.isLoggedIn && (
          <li className='avatar'>
            {/*  <Button className='logout' onClick={props.onLogout}>Logout</Button>  */}
            <Dropdown>
            <Dropdown.Toggle variant="" className='toggle'>
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
