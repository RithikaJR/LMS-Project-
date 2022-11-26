import React, { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import Search from '../Search Bar/Search.js';

import classes from './AvailableCourse.module.css';
import CourseItem from './CourseItem';

const AvailableCourses = () => {
    const [courses, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [searchName, setSearchName] = useState("");
  
    const onSearchHandler = (name)=>{
      console.log(name)
      setSearchName(name);
    }

    useEffect(() => {
      const fetchMeals = async () => {
        let response;
        if(searchName===''){
          response = await fetch(
            'http://localhost:8080/api/courses');
        }else{
          response = await fetch('http://localhost:8080/api/courses/search/findAllBycourseName?name='+searchName);
        }
        
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();
  
        const loadedCourses = [];
        const courseArray = {...responseData._embedded.course};

        console.log(responseData);
        for (const key in courseArray) {
          loadedCourses.push({
            id: key,
            name: courseArray[key].courseName,
            image: courseArray[key].courseImageUrl,
            courseUrl: courseArray[key].courseUrl,
            description: courseArray[key].courseDescription,
          });
        }
  
        setMeals(loadedCourses);
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
  
    const coursesList = courses.map((course) => (
      <CourseItem
        key={course.id}
        id={course.id}
        name={course.name}
        image={course.image}
        url={course.courseUrl}
        description={course.description}
      />
    ));

    
  
    return (
      <React.Fragment>
        <Search search={onSearchHandler}/>
        <section className={classes.courses}>
          <ul>{coursesList}</ul>
        </section>
      </React.Fragment>
    );
  };
  
  export default AvailableCourses;
  