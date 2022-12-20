import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import UserPage from './components/Users/UserPage';
import UserMainPage from './components/Users/UserMainPage';
import CourseInterface from './components/Courses/CourseInterface';
import EmployeeHome from './components/Employee/EmployeeHome';
import HomeLearningAdmin from './components/Learning Admin/HomeLearningAdmin';
import CoursesLearningAdmin from './components/Courses/CoursesLearningAdmin';
import MainHeaderLA from './components/MainHeader/MainHeaderLA';
import UserMainPageLA from './components/Users/UserMainPageLA';
import Coursess from './components/Courses/Coursess';
import React, { useState,useRef,useEffect } from 'react';
import Notification from './components/Notification/Notification';

import SuperAdminHome from './components/Home/SuperAdminHome';
import LAHomePage from './components/LearningAdmin/LAHomePage';
import ViewEmployeeData from './components/CourseTracking/ViewEmployeeData';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [learningLoggedIn, setlearningLoggedIn] = useState(false);
  const [employeeLoggedIn, setemployeeLoggedIn] = useState(false);
  const [employeeName, setemployeeName] = useState('');
  const [employeeId, setemployeeId] = useState('');
  const [employeeEmail, setemployeeEmail] = useState('');
  const [userStatus, setuserStatus] = useState('');
  const [userId, setuserId] = useState('');
  const history = useHistory()

  useEffect(() => {
    const Token = sessionStorage.getItem('jwt')
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserName = localStorage.getItem('LoggedName');
    const storedEmployeeId = localStorage.getItem('LoggedEmployeeId');
    const storedEmail= localStorage.getItem('LoggedEmail');

    if(storedUserLoggedInInformation === '1' && Token != null){
      setIsLoggedIn(true); 
      setemployeeName(storedUserName);
      setemployeeId(storedEmployeeId);
      setemployeeEmail(storedEmail);
    }
    if(storedUserLoggedInInformation === '2' && Token != null){
      setlearningLoggedIn(true);
      setemployeeName(storedUserName);
      setemployeeId(storedEmployeeId);
      setemployeeEmail(storedEmail);
    }
    if(storedUserLoggedInInformation === '3' && Token != null){
      setemployeeLoggedIn(true);
      setemployeeName(storedUserName);
      setemployeeId(storedEmployeeId);
      setemployeeEmail(storedEmail);
    }
  },[employeeName]);

const loginHandler = (email, password) => {

  fetch("http://localhost:8080/authenticate", {

    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      userName :email,
      userPassword:password,
    })  
  }).then(response => {
    console.log("hello");
    console.log("request: ", response);
    return response.json();
  })
  .then(resJson => {
    console.log("hello");
    if((resJson.roleId == 1)){
      console.log("admin")
      sessionStorage.setItem("jwt",resJson.jwtToken);
      // localStorage.setItem("jwt",resJson.jwtToken);
      localStorage.setItem('isLoggedIn',resJson.roleId);
      localStorage.setItem('LoggedName',resJson.user.employeeName);
      // localStorage.setItem('LoggedEmployeeId',resJson.user.employee.employeeId);
      localStorage.setItem('LoggedEmployeeId',resJson.employeeId);
      localStorage.setItem('LoggedEmail',resJson.user.userName);
      setIsLoggedIn(true);
      history.push('/home');
      
      setemployeeName(resJson.user.employeeName)
      // setemployeeId(resJson.user.employee.employeeId)
      setemployeeId(resJson.employeeId)
      setuserStatus(resJson.initialStatus)
      setuserId(resJson.user.userId)

      
    }
    else if((resJson.roleId ==2)){
      console.log("learning admin")
      sessionStorage.setItem("jwt",resJson.jwtToken);
      // localStorage.setItem("jwt",resJson.jwtToken);
      localStorage.setItem('isLoggedIn',resJson.roleId);
      localStorage.setItem('LoggedName',resJson.user.employeeName);
      // localStorage.setItem('LoggedEmployeeId',resJson.user.employee.employeeId);
      localStorage.setItem('LoggedEmployeeId',resJson.employeeId);
      localStorage.setItem('LoggedEmail',resJson.user.userName);

      setlearningLoggedIn(true);
      history.push('/learaningAdmin');
      
      setemployeeName(resJson.user.employeeName)
      // setemployeeId(resJson.user.employee.employeeId)
      setemployeeId(resJson.employeeId)
      setuserStatus(resJson.initialStatus)
      setuserId(resJson.user.userId)
    }
    else if((resJson.roleId ==3)){
      console.log("Employee")
      sessionStorage.setItem("jwt",resJson.jwtToken);
      localStorage.setItem('isLoggedIn',resJson.roleId);
      localStorage.setItem('LoggedName',resJson.user.employeeName);
      // localStorage.setItem('LoggedEmployeeId',resJson.user.employee.employeeId);
      localStorage.setItem('LoggedEmployeeId',resJson.employeeId);
      localStorage.setItem('LoggedEmail',resJson.user.userName);

      setemployeeLoggedIn(true);
      history.push('/employee');
      
      setemployeeName(resJson.user.employeeName)
      // setemployeeId(resJson.user.employee.employeeId)
      setemployeeId(resJson.employeeId)
      setuserStatus(resJson.initialStatus)
      setuserId(resJson.user.userId)
    }else{
      alert("Enter Valid User Name or Password");
    }
 })
    
  };
const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('LoggedName');
    localStorage.removeItem('LoggedEmployeeId');
    sessionStorage.removeItem('jwt');
    // localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setlearningLoggedIn(false);
    setemployeeLoggedIn(false);
};

  return (
    <div>
      {isLoggedIn && <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={userStatus} userId={userId}/>}
      
      {learningLoggedIn && <MainHeader isAuthenticated={learningLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={userStatus} userId={userId}/> }
      {/* {employeeLoggedIn && <MainHeader isAuthenticated={employeeLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId}/> } */}
       <Switch>
          <Route path="/" exact>
              <Redirect to='/login'/>
          </Route>
          <Route path="/login">
            {!isLoggedIn ? <Login onLogin={loginHandler} />: <Redirect to='/home' />}
            {learningLoggedIn && <Redirect to='/learaningAdmin' />}
            {employeeLoggedIn && <Redirect to='/employee' />}
          </Route>
          <Route path="/courses" exact>
          {isLoggedIn ? <Courses onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          <Route path="/coursess" exact>
            <Coursess  /> 
          </Route>

          <Route path="/home" exact>
              {isLoggedIn ? <SuperAdminHome onLogout={logoutHandler} name={employeeName} employeeId={employeeId}/> : <Redirect to='/login' /> }
          </Route>

          <Route path="/users">
            {isLoggedIn ? <UserMainPage onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          <Route path="/notification">
          {isLoggedIn ? <Notification onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          <Route path="/reports">
          {isLoggedIn ? <ViewEmployeeData onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          <Route path="/learningadmin">
            <MainHeaderLA></MainHeaderLA>
            <HomeLearningAdmin  />
          </Route>

          <Route path="/courseslearningadmin">
            <MainHeaderLA></MainHeaderLA>
            <CoursesLearningAdmin/>
          </Route>

          <Route path="/courseslearningadmin">
            <CoursesLearningAdmin/>
            <MainHeaderLA></MainHeaderLA>
          </Route>

          <Route path="/userslearningadmin">
            <UserMainPageLA></UserMainPageLA>
            <MainHeaderLA></MainHeaderLA>
          </Route>

          <Route path="/courses/course-module">
            {isLoggedIn ? <CourseInterface onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

    
          <Route path="/employee">
            {employeeLoggedIn ? <EmployeeHome isAuthenticated={employeeLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={userStatus} userId={userId}/> : <Redirect to='/login' /> }
          </Route>
        
          {/* //Learning Admin */}
          <Route path="/learaningAdmin">
            {learningLoggedIn ? <LAHomePage onLogout={logoutHandler} name={employeeName} employeeId={employeeId}/>: <Redirect to='/login' /> }
          </Route>
        </Switch>
    </div>
    
  );
}

export default App;
