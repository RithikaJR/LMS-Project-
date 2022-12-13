import React from 'react';



import classes from './Navigation.module.css';

import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import image from '../images/team-male.jpg' 
import Button from '../UI/Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';

const Navigation = (props) => {
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
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <h1>Welcome {props.name}</h1>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Dropdown>
            <Dropdown.Toggle variant="" className='avatar'>
            <img src={image} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/employee">
                Home Page
              </Dropdown.Item>
              <Dropdown.Item href="#" onClick={showCartHandler}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item href="#">
              <Button className='logout' onClick={props.onLogout}>Logout</Button> 
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
