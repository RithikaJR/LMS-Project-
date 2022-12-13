// import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { Redirect, Route, Switch } from 'react-router-dom';
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

import slide1 from './components/images/slide1.jpg';
import slide4 from './components/images/slide4.jpg';
import React, { useState,useRef,useEffect } from 'react';
import Notification from './components/Notification/Notification';



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

  const images = [slide1,slide4];
  const [currentSlide, setCurrentSlide] = useState(0);
  // useRef does not cause a re-render
  let sliderInterval = useRef();
  let switchImages = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };
  useEffect(() => {
    sliderInterval = setInterval(() => {
      switchImages();
    }, 5000);
    return () => {
      clearInterval(sliderInterval);
    };
  });

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

          <Route path="/coursess" exact>
            <Coursess  /> 
        </Route>


          {/* <Route path="/courses/course-module">
              {isLoggedIn ? <CourseModules onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route> */}
          <Route path="/users">
            {isLoggedIn ? <UserMainPage onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          <Route path="/notification">
           <Notification></Notification>
          </Route>

          <Route path="/courses/course-module">
            {/* {isLoggedIn ? <CourseInterface onLogout={logoutHandler} /> : <Redirect to='/login' /> } */}
            <CourseInterface></CourseInterface>
          </Route>

          <Route path="/employee">
            <EmployeeHome />
            {/* <div className="imgWrapper">
            {images.map((img, index) => {
              return (
                <img
                  src={img}
                  className={index === currentSlide ? "imageActive homeImage" : "image" }
                />
              );
            })}
         </div> */}
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
