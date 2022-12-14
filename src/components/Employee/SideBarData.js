import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [

  {
    title: 'Courses',
    path: '/employee',
    icon: <RiIcons.RiProfileLine />,
    cName: 'nav-text'
  },
  {
    title: 'Enrolled Courses',
    path: '/employee/enrolled-courses',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Feedback Form',
    path: '/employee/feedbackform',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

{
    title: 'Profile',
    path: '/employee/profile',
    icon: <RiIcons.RiAuctionFill />,
    cName: 'nav-text'
  },
 

];