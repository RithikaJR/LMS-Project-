import React, { useEffect, useState } from 'react';
import Search from '../../Search Bar/Search.js';
import classes from './EmployeeAvailableCourses.module.css';
import EmployeeCourseItem from './EmployeeCourseItem';
import './EmployeeAvailableCourses.css'

import ReactPaginate from 'react-paginate';

const EmployeeAvailableCourses = (props) => {

    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    const [courses, setCourse] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [searchName, setSearchName] = useState("");
    
    // Pagination
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = courses.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(courses.length / itemsPerPage);


    const onSearchHandler = (name)=>{
      console.log(name)
      setSearchName(name);
    }

    useEffect(() => {
      const fetchCourses = async () => {
        let response;
        if(searchName===''){
          response = await fetch(
            'http://localhost:8080/api/courses',{
              headers:{
                'Authorization':token
              }
            });
        }else{
          response = await fetch('http://localhost:8080/api/courses/search/findBycourseNameContaining?name='+searchName,{
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
        const courseArray = {...responseData._embedded.course};

        console.log(responseData);
        for (const key in courseArray) {
          // if(courseArray[key].courseId==){
          loadedCourses.push({
            id: key,
            courseId: courseArray[key].courseId,
            name: courseArray[key].courseName,
            description: courseArray[key].courseDescription,
            image: courseArray[key].courseImageUrl,
            duration: courseArray[key].courseDuration
          });
        // }
        }
  
        setCourse(loadedCourses);
        setIsLoading(false);
      };
  
      fetchCourses().catch((error) => {
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
  
    const coursesList = currentItems.map((course) => (
      <EmployeeCourseItem
        key={course.id}
        id={course.courseId}
        name={course.name}
        image={course.image}
        course_duration={course.duration}
        description={course.description}
        employeeId={props.employeeId}
        currentItems={currentItems}
      />
    ));

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % courses.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <React.Fragment>
        <Search search={onSearchHandler}/>
        
        <section className={classes.courses}>
          <ul>{coursesList}</ul>
        </section>

        {/* Pagination */}
        <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName='page-num'
              previousLinkClassName='page-num'
              nextLinkClassName='page-num'
              activeClassName='active'
            />
      </React.Fragment>
    );
  };
  
  export default EmployeeAvailableCourses;
  