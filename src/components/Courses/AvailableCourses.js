import { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';

import classes from './AvailableCourse.module.css';
import CourseItem from './CourseItem';

const AvailableCourses = () => {
    const [courses, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
  
    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch(
          'https://lmsproject-49ed0-default-rtdb.firebaseio.com/courses.json'
          // 'http://localhost:8080/api/mealitems/meals.json'
        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();
  
        const loadedCourses = [];
        console.log(responseData);
        for (const key in responseData) {
          loadedCourses.push({
            id: key,
            name: responseData[key].courseName,
            courseUrl: responseData[key].courseUrl,
            description: responseData[key].description,
          });
        }
  
        setMeals(loadedCourses);
        setIsLoading(false);
      };
  
      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, []);
  
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
        url={course.courseUrl}
        description={course.description}
      />
    ));
  
    return (
      <section className={classes.courses}>
        <Card>
          <ul>{coursesList}</ul>
        </Card>
      </section>
    );
  };
  
  export default AvailableCourses;
  