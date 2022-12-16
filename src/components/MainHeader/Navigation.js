import React from 'react';
import { NavLink } from 'react-router-dom';
import icon3 from '../images/icon3.png';


import Notification from '../Notification/Notification';



import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <h1>Welcome {props.name}</h1>
          </li>
        )}
        
      
          <li>
            <NavLink to = '/notification' className={classes.usertext}>
            <div className={classes.bell}>
              <img src={icon3}/>
              </div>
            </NavLink>
          </li>
        
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}

      </ul>
    </nav>
  );
};

export default Navigation;
