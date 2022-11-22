import React from 'react';
import exp_logo from '../images/exp_logo.png';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>

      <div className={classes['header-image']}>
          <a href=''><img src={exp_logo}/></a>
      </div>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
