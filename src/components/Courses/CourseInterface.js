import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from './CourseInterface.module.css';
import CourseModuleList from "./CourseModuleList";
import Collapsible from 'react-collapsible';




const CourseInterface = (props) => {
    

    // return (
    //     <div className={classes.wrap}>
    //         <h1>Modules</h1>
    //         <a href=""><Button>View Course</Button></a>
    //     </div>
    // )

  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [searchName, setSearchName] = useState("");

 
//   const [courseId, setCurseId] = useState(location.state.id);
  let location = useLocation();
  const propdata = location.state.id;
  console.log("interface "+propdata);
  // setCurseId();

  // const onSearchHandler = (name)=>{
  //   console.log(name)
  //   setSearchName(name);
  // }

  useEffect(() => {
    const fetchModules = async () => {
      let response;
      if(searchName===''){
        response = await fetch(
          'http://localhost:8080/api/courses/'+propdata+'/modules');
      }else{
        response = await fetch('http://localhost:8080/api/courses/search/findAllBycourseName?name='+searchName);
      }
      

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedCourses = [];
      const moduleArray = {...responseData._embedded.module};

      // console.log(responseData);
      for (const key in moduleArray) {
        loadedCourses.push({
          id: key,
          moduleId: moduleArray[key].moduleId,
          name: moduleArray[key].moduleName,
          image: moduleArray[key].moduleImageUrl,
          courseUrl: moduleArray[key].moduleUrl,
          // description: moduleArray[key].courseDescription,
        });
      }

      // const newapi = [];
      // const apiArray = {...responseData._embedded.course};

      // // console.log(responseData);
      // for (const keyy in apiArray) {
      //   loadedCourses.push({
      //     // id:keyy,
      //     moduleApi:apiArray[keyy]._links.modules.href
      //   });
      // }
      // console.log("ss"+loadedCourses);


      setModules(loadedCourses);
      // setCurseId(newapi);
      setIsLoading(false);
    };

    fetchModules().catch((error) => {
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

  const courseModuleList = modules.map((module) => (
    <CourseModuleList
      key={module.id}
      id={module.moduleId}
      name={module.name}
      image={module.image}
      url={module.courseUrl}
      // api={module.moduleApi}
      // description={course.description}
    />
  ));

  

  return (
    <React.Fragment>
      {/* <Search search={onSearchHandler}/> */}

      {/* <p>{location.state.id}</p> */}
      
      
      
      {/* <section className={classes.courses}>
        <ul>{courseModuleList}</ul>
        
        </section> */}
        
        {/* <label>
          <select value={courseModuleList}></select>
        </label> */}

    <Collapsible trigger="Start here">
      <p>
        This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
    </Collapsible>

    
      
    </React.Fragment>
  );

  return(
    <div>
      <select>

      </select>
    </div>
  )
}

export default CourseInterface;