import React from 'react';
import { NavLink } from 'react-router-dom';
import bell2 from '../images/bell2.png';

import Notification from '../Notification/Notification';



import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <h1>Welcome Super Admin!</h1>
          </li>
        )}
        
      
          <li>
            <NavLink to = '/notification' className={classes.usertext}>
            <div className={classes.bell}>
              <img src={bell2}/>
              {/* not */}
            
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
