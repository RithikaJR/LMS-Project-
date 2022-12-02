import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Route } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import classes from './EmployeesHome.css';
import { IconContext } from 'react-icons';
import Courses from '../Courses/Courses';
import FeedbackForm from './FeedbackForm';

function EmployeesHome() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className='tagName'>Employee</h1>
          
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Route path="/employees/courses" exact>
              <Courses /> 
          </Route>
         
          <Route path="/employees/feedbackform" exact>
              <FeedbackForm /> 
          </Route>

      </IconContext.Provider>
    </>
  );
}

export default EmployeesHome;