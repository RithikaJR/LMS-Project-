import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../images/notification bell.png';
import icon_notify from '../images/notification bell_notify.png';
import classes from './Navigation.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './Nav-Dropdown.css';
import image from '../images/team-male.jpg' 
import Button from '../UI/Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import UserProfile from '../Employee/UserProfile';
import Modal from '../UI/Modal/Modal';
import close from '../images/blue_close.png'

const Navigation = (props) => {
  let Username = localStorage.getItem('LoggedName');
  let token = `Bearer ${sessionStorage.getItem('jwt')}`;

  const [overlayShown, setoverlayIsShown] = useState(false);
  const [notify, setNotify] = useState(true);
  const [approvalList, setApprovalList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  
  useEffect(() => {
      const courseApprovalList = async () => { 
        let response = await fetch(
              'http://localhost:8080/api/course-approval',{
            headers:{
              'Authorization':token
            }
          });
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const responseData = await response.json();
          const loadedApprovalList = [];
          const listArray = {...responseData._embedded.courseApproval};

          console.log(responseData);
          for (const key in listArray) {
            if(listArray[key].approvalStatus === "pending"){
            loadedApprovalList.push({
              id: key,
              courseApprovalId:listArray[key].courseApprovalId,
              employeeName: listArray[key].employeeName,
              employeeId: listArray[key].employeeId,
              courseId: listArray[key].courseId,
              courseName: listArray[key].courseName,
              approvalStatus:listArray[key].approvalStatus
            });
          }
          }
    
          setApprovalList(loadedApprovalList);
        
          setIsLoading(false);
        };
    
        courseApprovalList().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });


    if(props.tracker===false){
      setoverlayIsShown(true);
    }else{
      setoverlayIsShown(false);
    }

    if(approvalList.length + feedbackList.length != 0){
      setNotify(true);
    }
    else {
      setNotify(false);
    }
   

    //feedbacklists



    const fetchFeedbacks = async () => {
      let response;
        response = await fetch(
          'http://localhost:8080/api/feedback-form'
          ,{
            headers:{
              'Authorization':token
            }
          });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const employeeFeedback = [];
      const feedbackArray = {...responseData._embedded.feedback};

      console.log("gygtg"+responseData);
      for (const key in feedbackArray) {
      if(feedbackArray[key].status === false){
        employeeFeedback.push({
          id: key,
          feedbackId: feedbackArray[key].feedbackId,
          employeeId: feedbackArray[key].employeeId,
          employeeName: feedbackArray[key].employeeName,
          feedback: feedbackArray[key].feedback,
          status: feedbackArray[key].status,
        });
      }
    }
      // console.log("dfsdf")
      setFeedbackList(employeeFeedback);
      console.log(feedbackList);
      setIsLoading(false);
    };

    fetchFeedbacks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  


    
   
  },[approvalList,feedbackList]);
  // approvalList.length

  let approval_length = approvalList.length;
  let feedback_length = feedbackList.length;

  const showCartHandler = () => {
    setoverlayIsShown(true);
  };

  const hideCartHandler = () => {
    setoverlayIsShown(false);
  };



  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <h1>Welcome {Username}</h1>
          </li>
        )}

          <li className={classes.notify}>
          <Dropdown>
            <Dropdown.Toggle variant="" className='toggle'>
              {notify ? 
              <img src={icon_notify}/> :
              <img src={icon}/>}
            </Dropdown.Toggle>
            <Dropdown.Menu className='menu'>
              <Dropdown.Item>
                <div className='item'>
                  <NavLink to='/notification'>
                    <h5>You have <span className={classes.number}>{approval_length}</span> new approvals</h5>
                  </NavLink>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className='menu'>
                <div className='item'>
                  <NavLink to='/feedbacks' className='navv'>
                    <h5>You have <span className={classes.number}>{feedback_length}</span> new feedbacks</h5>
                  </NavLink>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </li>
        
        {props.isLoggedIn && (
          <li className='avatar'>
            {/*  <Button className='logout' onClick={props.onLogout}>Logout</Button>  */}
            <Dropdown>
            <Dropdown.Toggle variant="" className='toggle'>
            <img src={image} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className='menu' href="/employee">
                Home Page
              </Dropdown.Item>
              <Dropdown.Item className='menu'href="#" onClick={showCartHandler}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item className='menu' href="#" onClick={props.onLogout}>
              Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </li>
        )}

      </ul>
      {overlayShown && 
          <Modal onClose={overlayShown} className={classes.overlay}>
            <div className={classes.close_nav}>
              <Button onClick={hideCartHandler}><img src={close}/></Button>
            </div>
          <UserProfile name={props.name} employeeId={props.employeeId} userId={props.userId} />
          {/* <Button onClick={hideCartHandler}>Close</Button> */}
          {/* name={props.name} employeeId={props.employeeId} */}
          </Modal>}
    </nav>
  );
};

export default Navigation;
