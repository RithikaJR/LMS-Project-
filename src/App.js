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
    const Token = sessionStorage.getItem('jwt')
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    const storedUserName = localStorage.getItem('LoggedName');
    const storedEmployeeId = localStorage.getItem('LoggedEmployeeId');

    if(storedUserLoggedInInformation === '1' && Token != null){
      setIsLoggedIn(true); 
      setemployeeName(storedUserName);
      setemployeeId(storedEmployeeId);
    }
    if(storedUserLoggedInInformation === '2' && Token != null){
      setlearningLoggedIn(true);
      setemployeeName(storedUserName);
      setemployeeId(storedEmployeeId);
    }
    if(storedUserLoggedInInformation === '3' && Token != null){
      setemployeeLoggedIn(true);
      setemployeeName(storedUserName);
      setemployeeId(storedEmployeeId);
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
    
    if((resJson.roleId ==1)){
      console.log("admin")
      sessionStorage.setItem("jwt",resJson.jwtToken);
      // localStorage.setItem("jwt",resJson.jwtToken);
      localStorage.setItem('isLoggedIn',resJson.roleId);
      localStorage.setItem('LoggedName',resJson.user.employeeName);
      localStorage.setItem('LoggedEmployeeId',resJson.user.employee.employeeId);

      setIsLoggedIn(true);
      history.push('/home');
      
      setemployeeName(resJson.user.employeeName)
      setemployeeId(resJson.user.employee.employeeId)
      // setemployeeTracker(resJson.userLoginTracker)
    }
    else if((resJson.roleId ==2)){
      console.log("learning admin")
      sessionStorage.setItem("jwt",resJson.jwtToken);
      // localStorage.setItem("jwt",resJson.jwtToken);
      localStorage.setItem('isLoggedIn',resJson.roleId);
      localStorage.setItem('LoggedName',resJson.user.employeeName);
      localStorage.setItem('LoggedEmployeeId',resJson.user.employee.employeeId);

      setlearningLoggedIn(true);
      history.push('/learaningAdmin');
      
      setemployeeName(resJson.user.employeeName)
      setemployeeId(resJson.user.employee.employeeId)
      // setemployeeTracker(resJson.userLoginTracker)
    }
    else if((resJson.roleId ==3)){
      console.log("Employee")
      sessionStorage.setItem("jwt",resJson.jwtToken);
      localStorage.setItem('isLoggedIn',resJson.roleId);
      localStorage.setItem('LoggedName',resJson.user.employeeName);
      localStorage.setItem('LoggedEmployeeId',resJson.user.employee.employeeId);

      setemployeeLoggedIn(true);
      history.push('/employee');
      
      setemployeeName(resJson.user.employeeName)
      setemployeeId(resJson.user.employee.employeeId)
      // setemployeeTracker(resJson.userLoginTracker)
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
      {isLoggedIn && <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={employeeTracker}/>}
      
      {learningLoggedIn && <MainHeader isAuthenticated={learningLoggedIn} onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={employeeTracker}/> }
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

          <Route path="/home" exact>
              {isLoggedIn ? <SuperAdminHome onLogout={logoutHandler} name={employeeName} employeeId={employeeId} tracker={employeeTracker}/> : <Redirect to='/login' /> }
          </Route>

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
