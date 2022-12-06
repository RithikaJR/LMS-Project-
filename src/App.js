import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { Redirect, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import UserPage from './components/Users/UserPage';
import UserMainPage from './components/Users/UserMainPage';
import CourseInterface from './components/Courses/CourseInterface';
import EmployeeHome from './components/Employee/EmployeeHome';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true);
    }
  },[]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };



  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
       {isLoggedIn && <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> }
      <main>
        <Switch>
          <Route path="/" exact>
              <Redirect to='/login'/>
          </Route>

          <Route path="/login">
            {!isLoggedIn ? <Login onLogin={loginHandler} /> :<Redirect to='/home' />}
          </Route>
          <Route path="/home">
              {isLoggedIn ? <Home onLogout={logoutHandler} /> : <Redirect to='/login' />}
          </Route>
          {/* <Route path="/courses" exact>
              {isLoggedIn ? <Courses onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route> */}

          <Route path="/courses" exact>
              <Courses  /> 
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
          <Route path="/employee">
            <EmployeeHome onLogout={logoutHandler} />
          </Route>

         
          
        </Switch>

     

        {/* {!isLoggedIn && <Login onLogin={loginHandler} />}

        {isLoggedIn && <Home onLogout={logoutHandler} />} */}

      </main>
      
      
      
      {/* <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main> */}
    </React.Fragment>
  );
}

export default App;
