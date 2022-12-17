import React from 'react';
import exp_logo from '../images/exp_logo.png';


import classes from './MainHeader.module.css';
import NavigationLA from './NavigationLA';

const MainHeaderLA = (props) => {
  return (
    <header className={classes['main-header']}>

      <div className={classes['header-image']}>
          <a href=''><img src={exp_logo}/></a>
      </div>
      <NavigationLA />
    </header>
  );
};

export default MainHeaderLA;
