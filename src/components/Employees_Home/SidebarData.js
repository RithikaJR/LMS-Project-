import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import EmployeesHome from './EmployeesHome';

export const SidebarData = [

  {
    
    title: 'Courses',
    path: '/employees/courses',
    icon: <RiIcons.RiProfileLine />,
    cName: 'nav-text'
    
  },

  {
    title: 'Feedback form',
    path: '/employees/feedbackform',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

//   {
//     title: 'Auction',
//     path: '/customer/auction',
//     icon: <RiIcons.RiAuctionFill />,
//     cName: 'nav-text'
//   },
 
  {
    title: 'Log Out',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }
];