import React from 'react';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            {/* <a href="/">Home</a> */}
            <h1>Welcome Pratheep!</h1>
          </li>
        )}
        {/* {props.isLoggedIn && (
          <li>
            <a href="courses">Courses</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="users">Users</a>
          </li>
        )} */}
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
