import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import UserPage from './components/Users/UserPage';
import UserMainPage from './components/Users/UserMainPage';
import CourseInterface from './components/Courses/CourseInterface';
import EmployeeHome from './components/Employee/EmployeeHome';
import SuperAdminHome from './components/Home/SuperAdminHome';
import LAHomePage from './components/LearningAdmin/LAHomePage';
import EmployeeCourseInterface from './components/Employee/EmployeeCourses/EmployeeCourseInterface';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [learningLoggedIn, setlearningLoggedIn] = useState(false);
  const [employeeLoggedIn, setemployeeLoggedIn] = useState(false);
  const [employeeName, setemployeeName] = useState('');
  const [employeeId, setemployeeId] = useState('');
  const [employeeTracker, setemployeeTracker] = useState('');
  const history = useHistory()

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true);
      
    }
    if(storedUserLoggedInInformation === '2'){
      setlearningLoggedIn(true);
    }
    if(storedUserLoggedInInformation === '3'){
      setemployeeLoggedIn(true);
    }
  },[]);

const loginHandler = (email, password) => {

  fetch("http://localhost:8080/api/user", {

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
    // sessionStorage.setItem("jwt",resJson.jwt);
    if((resJson.roleId ==1)){
      console.log("admin")
      localStorage.setItem('isLoggedIn','1');
      setIsLoggedIn(true);
      history.push('/home');
      setemployeeName(resJson.employeeName)
      setemployeeId(resJson.employeeId)
      setemployeeTracker(resJson.userLoginTracker)
    }
    else if((resJson.roleId ==2)){
      console.log("learning admin")
      localStorage.setItem('isLoggedIn','2');
      setlearningLoggedIn(true);
      history.push('/learaningAdmin');
      setemployeeName(resJson.employeeName)
      setemployeeId(resJson.employeeId)
      setemployeeTracker(resJson.userLoginTracker)
    }
    else if((resJson.roleId ==3)){
      console.log("Employee")
      localStorage.setItem('isLoggedIn','3');
      setemployeeLoggedIn(true);
      history.push('/employee');
      setemployeeName(resJson.employeeName)
      setemployeeId(resJson.employeeId)
      setemployeeTracker(resJson.userLoginTracker)
    }
 })
    
  };
const logoutHandler = () => {
  // We should of course check email and password
  // But it's just a dummy/ demo anyways
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setlearningLoggedIn(false);
    setemployeeLoggedIn(false);
};
      

  return (
    <div>

      {isLoggedIn && <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId} />}
      
      {learningLoggedIn && <MainHeader isAuthenticated={learningLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId}/> }
      {/* {employeeLoggedIn && <MainHeader isAuthenticated={employeeLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId}/> } */}
       <Switch>
          <Route path="/" exact>
              <Redirect to='/login'/>
          </Route>
          <Route path="/login">
            {!isLoggedIn ? <Login onLogin={loginHandler} /> :<Redirect to='/home' />}
            {!learningLoggedIn ? <Login onLogin={loginHandler} /> :<Redirect to='/learaningAdmin' /> }
              {!employeeLoggedIn ? <Login onLogin={loginHandler} /> :<Redirect to='/employee' /> }
          </Route>
          <Route path="/courses" exact>
              {isLoggedIn ? <Courses onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          <Route path="/home" exact>
              {isLoggedIn ? <SuperAdminHome onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={employeeTracker}/> : <Redirect to='/login' /> }
          </Route>

          {/* <Route path="/courses/course-module">
              {isLoggedIn ? <CourseModules onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route> */}

          <Route path="/users">
            {isLoggedIn ? <UserMainPage onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>
          <Route path="/courses/course-module">
            {isLoggedIn ? <CourseInterface onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          {/* Employee */}
          <Route path="/employee">
            {employeeLoggedIn ? <EmployeeHome isAuthenticated={employeeLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={employeeTracker}/> : <Redirect to='/login' /> }
          </Route>
        
          {/* //Learning Admin */}
          <Route path="/learaningAdmin">
            {learningLoggedIn ? <LAHomePage onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={employeeTracker}/>: <Redirect to='/login' /> }
          </Route>
          
        </Switch>


    </div>
    
  );
}

export default App;
