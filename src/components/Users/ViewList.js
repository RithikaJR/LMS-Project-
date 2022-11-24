import { useEffect, useState } from 'react';

// import classes from './ViewList.module.css';
import ListItem from './ListItem';

const ViewList = () => {
    const [courses, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
  
    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch(
          'http://localhost:8080/api/employee'
        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();
  
        const loadedCourses = [];
        const courseArray = {...responseData._embedded.employees};

        console.log(responseData);
        for (const key in courseArray) {
          loadedCourses.push({
            id: key,
            employeeFirstName: courseArray[key].employeeFirstName,
            employeeLastName: courseArray[key].employeeLastName,
            employeeEmail: courseArray[key].employeeEmail,
            // description: courseArray[key].courseDescription,
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
        <section>
          <p>Loading...</p>
        </section>
      );
    }
  
    if (httpError) {
      return (
        <section>
          <p>{httpError}</p>
        </section>
      );
    }
  
    const coursesList = courses.map((course) => (
      <ListItem
        key={course.employeeId}
        id={course.employeeId}
        employeeFirstName={course.employeeFirstName}
        employeeLastName={course.employeeLastName}
        employeeEmail={course.employeeEmail}
        // description={course.description}
      />
    ));
  
    return (
      <section>
        
          <ul>{coursesList}</ul>
        
      </section>
    );
  };
  
  export default ViewList;
  