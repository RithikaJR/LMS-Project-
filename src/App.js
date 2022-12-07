import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';
import { Redirect, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import UserPage from './components/Users/UserPage';
import UserMainPage from './components/Users/UserMainPage';
import CourseInterface from './components/Courses/CourseInterface';
import EmployeeHome from './components/Employee/EmployeeHome';
import SuperAdminHome from './components/Home/SuperAdminHome';
// import LearningAdminLogin from './components/Login/LearningAdminLogin.js'


function App() {
  
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [searchName, setSearchName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true);
    }
  },[]);
//   useEffect(() => {
//     const fetchModules = async () => {
//       let response;
//       if(searchName===''){
//         response = await fetch(
//           'http://localhost:8080/api/user');
//         }

//         if (!response.ok) {
//           throw new Error('Something went wrong!');
//         }
        
//       const responseData = await response.json();

//       const loadedRoles = [];
//       const RoleArray = {...responseData._embedded.module};

//       for (const key in RoleArray) {
//         loadedRoles.push({
//           id: key,
//           roleId: RoleArray[key].roleId,
//           name: RoleArray[key].employeeName,
//         });

//         setModules(loadedRoles);
//         setIsLoading(false);
//     };
//       fetchModules().catch((error) => {
//       setIsLoading(false);
//       setHttpError(error.message);
//     });
//   }
// }, []);
// if (isLoading) {
//   return (
//     <section>
//       <p>Loading...</p>
//     </section>
//   );
// }

// if (httpError) {
//   return (
//     <section>
//       <p>{httpError}</p>
//     </section>
//   );
// }

// const roleList = modules.map((module) => (
//   <RoleItem
//     key={module.id}
//     id={module.roleId}
//     name={module.name}
//   />


// ));

const loginHandler = (email, password) => {
  // We should of course check email and password
  // But it's just a dummy/ demo anyways
  localStorage.setItem('isLoggedIn','1');
  setIsLoggedIn(true);
};

const logoutHandler = () => {
  // We should of course check email and password
  // But it's just a dummy/ demo anyways
  localStorage.setItem('isLoggedIn','0');
  setIsLoggedIn(false);
};
      

  return (
    <div>

      {isLoggedIn && <MainHeader />}
       <Switch>
          <Route path="/" exact>
              <Redirect to='/login'/>
          </Route>
          <Route path="/login">
            {!isLoggedIn ? <Login onLogin={loginHandler} /> :<Redirect to='/home' />}
          </Route>
          <Route path="/courses" exact>
              {isLoggedIn ? <Courses onLogout={logoutHandler} /> : <Redirect to='/login' /> }
          </Route>

          <Route path="/home" exact>
              {isLoggedIn ? <SuperAdminHome onLogout={logoutHandler} /> : <Redirect to='/login' /> }
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


    </div>
    
  );
}

export default App;
