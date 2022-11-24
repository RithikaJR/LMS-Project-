import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { Redirect, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import UserPage from './components/Users/UserPage';


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
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      
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
          <Route path="/courses">
              {isLoggedIn ? <Courses onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>
          <Route path="/users">
            {isLoggedIn ? <UserPage onLogout={logoutHandler} /> : <Redirect to='/login' /> }
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
