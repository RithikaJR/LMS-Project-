import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
// import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { Redirect, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import UserPage from './components/Users/UserPage';
import UserMainPage from './components/Users/UserMainPage';
import CourseInterface from './components/Courses/CourseInterface';
import EmployeeHome from './components/Employee/EmployeeHome';
import RoleItem from './RoleItem';
import { AiFillPropertySafety } from 'react-icons/ai';
import SuperAdminRouting from './components/Login/SuperAdminRouting';
import SuperAdminHome from './components/Home/SuperAdminHome';
import EmployeeRouting from './components/Login/EmployeeRouting';
import LearningAdminRouting from './components/Login/LearningAdminRouting';
// import LearningAdminLogin from './components/Login/LearningAdminLogin.js'


function App() {
  
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [searchName, setSearchName] = useState("");
  const [superLoggedIn, setSuperLoggedIn] = useState(false);
  const [learningLoggedIn, setLearningLoggedIn] = useState(false);
  const [employeeLoggedIn, setEmployeeLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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

const loginHandler = () => {
  // We should of course check email and password
  // But it's just a dummy/ demo anyways
  // localStorage.setItem('isLoggedIn','1');
  setIsLoggedIn(true);
};
      

  return (
    <div>
       <Switch>
          <Route path="/" exact>
              <Redirect to='/login'/>
          </Route>
          <Route path="/login">
            {!isLoggedIn ? <Login onLogin={loginHandler} /> :<Redirect to='/learningadminrouting' />}
          </Route>
          <Route path="/superadminrouting">
            {isLoggedIn ? <SuperAdminRouting onLogin={loginHandler} /> :<Redirect to='/login' />}
          </Route>
          <Route path='/learningadminrouting'>
            {isLoggedIn ? <LearningAdminRouting onLogin={loginHandler} /> :<Redirect to='/login' />}
          </Route>
          <Route path='/employeerouting'>
            {isLoggedIn ? <EmployeeRouting onLogin={loginHandler} /> :<Redirect to='/login' />}
          </Route>  
        </Switch>


    </div>
    
  );
}

export default App;
