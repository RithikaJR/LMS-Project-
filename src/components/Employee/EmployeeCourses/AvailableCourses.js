import React, { useEffect, useState } from 'react';
import Search from '../../Search Bar/Search.js';

import classes from './AvailableCourse.module.css';
import CourseItem from './CourseItem';
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from "swiper";
import 'swiper/css';
import "swiper/css/free-mode";
import 'bootstrap/dist/css/bootstrap.min.css';


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
          response = await fetch('http://localhost:8080/api/courses/search/findBycourseNameContaining?name='+searchName);
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
            courseId: courseArray[key].courseId,
            name: courseArray[key].courseName,
            description: courseArray[key].courseDescription,
            image: courseArray[key].courseImageUrl,
            // courseUrl: courseArray[key].courseUrl,
            // moduleApi:courseArray[key]._links.modules.href,
            
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
        id={course.courseId}
        name={course.name}
        image={course.image}
        // url={course.courseUrl}
        description={course.description}
        // api={module.moduleApi}
      />
    ));

    
  
    return (
      <React.Fragment>
        <Search search={onSearchHandler}/>
        
        <section className={classes.courses}>
          <ul>{coursesList}</ul>
        </section>
        {/* <Swiper 
         freeMode={true}
         grabCurser={true}
         modules={[FreeMode]}
         className="mySwiper"
         slidesPerView={5}
         spaceBetween={30}
         >
          <SwiperSlide>
          <ul>{coursesList}</ul>
          </SwiperSlide>

          <SwiperSlide>
          <ul>{coursesList}</ul>
          </SwiperSlide>
         </Swiper> */}
      </React.Fragment>
    );
  };
  
  export default AvailableCourses;
  