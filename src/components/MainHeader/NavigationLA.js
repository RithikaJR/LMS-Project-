import React from 'react';
import profilepicture from '../images/profilepic.jpg';
import classes from './Navigation.module.css';
import { Dropdown, Image } from 'semantic-ui-react'



const NavigationLA = (props) => {

  const trigger = (
    <span className={classes.avatar}>
      <Image avatar src={profilepicture}   />
      {'Justin'}
     </span>

  )

  const options = [
    
    { key: 'settings', text: 'Status: active'},
    { key: 'sign-out', text: 'Log Out'},
  ]
  
  
  return (
    <nav className={classes.nav}>
      <ul>
          <li>
            <h1>Welcome</h1>
          </li>
          
          <li>
          <div className={classes.profilepic}>
            
                <Dropdown
                  trigger={trigger}
                  options={options}
                  pointing='top left'
                />
        </div>
          </li>       
      </ul>
    </nav>
  );
};


export default NavigationLA;
