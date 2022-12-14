import React, { useEffect, useState } from 'react';

import classes from './EmployeeAvailableCourses.module.css';
import EmployeeCourseItem from './EmployeeCourseItem';
import EnrolledCourseItem from './EnrolledCourseItem.js';

import ReactPaginate from 'react-paginate';

const EnrolledCourses = (props) => {
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    const [enrolledCourses, setEnrolledCourse] = useState([]);
    const [enrolledCourseId, setEnrolledCourseId] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [searchName, setSearchName] = useState("");
  
    // Pagination
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = enrolledCourses.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(enrolledCourses.length / itemsPerPage);
    
    
    useEffect(() => {
      const fetchMeals = async () => {
        let response;
        if(searchName===''){
          response = await fetch(
            'http://localhost:8080/api/course/get-enrolled-course/'+props.employeeId,{
              headers:{
                'Authorization':token
              }
            });
        }
        
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const responseData = await response.json();
  
        const loadedCourses = [];
        const courseArray = {...responseData.coursesEnrolled};

        console.log(courseArray);
        for (const key in courseArray) {
          loadedCourses.push({
            id: key,
            courseId: courseArray[key].courseId,
            name: courseArray[key].courseName,
            description: courseArray[key].courseDescription,
            image: courseArray[key].courseImageUrl,
            duration: courseArray[key].courseDuration,
            rating:courseArray[key].courseRating,
            
            
          });
        }

        setEnrolledCourse(loadedCourses);
        console.log(loadedCourses);
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
        description={course.description}
        duration={course.duration}
        employeeId={props.employeeId}
      />
    ));

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % enrolledCourses.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    
  
    return (
      <div className={classes.enroll_page}>
        <h2>Enrolled Courses</h2>
        <section className={classes.courses}>
          <ul>{coursesList}</ul>
        </section>

        {/* Pagination */}
        <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName='page-num'
              previousLinkClassName='page-num'
              nextLinkClassName='page-num'
              activeClassName='active'
            />
      </div>
    );
  };

export default EnrolledCourses;