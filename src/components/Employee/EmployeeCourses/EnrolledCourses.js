import React, { useEffect, useState } from 'react';
import Search from '../../Search Bar/Search.js';

import classes from './EmployeeAvailableCourses.module.css';
import EmployeeCourseItem from './EmployeeCourseItem';
import EnrolledCourseItem from './EnrolledCourseItem.js';

const EnrolledCourses = (props) => {
    const [enrolledCourses, setEnrolledCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [searchName, setSearchName] = useState("");
  
    // const onSearchHandler = (name)=>{
    //   console.log(name)
    //   setSearchName(name);
    // }

    useEffect(() => {
      const fetchMeals = async () => {
        let response;
        if(searchName===''){
          response = await fetch(
            'http://localhost:8080/api/enrolled-courses/'+props.employeeId);
        }else{
        //   response = await fetch('http://localhost:8080/api/courses/search/findBycourseNameContaining?name='+searchName);
        }
        
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();
  
        const loadedCourses = [];
        // const courseArray = {...responseData._embedded};

        console.log(responseData);
        for (const key in responseData) {
          loadedCourses.push({
            id: key,
            courseId: responseData[key].courseId,
            name: responseData[key].courseName,
            description: responseData[key].courseDescription,
            image: responseData[key].courseImageUrl,
            // courseUrl: courseArray[key].courseUrl,
            // moduleApi:courseArray[key]._links.modules.href,
            
          });
        }
  
        setEnrolledCourse(loadedCourses);
        setIsLoading(false);
      };
  
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, [searchName]);
  
    if (isLoading) {
      return (
        <section className={classes.coursesLoading}>
          <p>Loading...</p>
        </section>
      );
    }
  
    if (httpError) {
      return (
        <section className={classes.coursesError}>
          <p>{httpError}</p>
        </section>
      );
    }
  
    const coursesList = enrolledCourses.map((course) => (
      <EnrolledCourseItem
        key={course.id}
        id={course.courseId}
        name={course.name}
        image={course.image}
        // url={course.courseUrl}
        description={course.description}
        // api={module.moduleApi}
        employeeId={props.employeeId}
      />
    ));

    
  
    return (
      <React.Fragment>
        <h2>Enrolled Course By {props.name}</h2>
        {/* <Search search={onSearchHandler}/> */}
        <section className={classes.courses}>
          <ul>{coursesList}</ul>
        </section>
      </React.Fragment>
    );
  };

export default EnrolledCourses;