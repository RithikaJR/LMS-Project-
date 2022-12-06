import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from './CourseInterface.module.css';
import CourseModuleList from "./CourseModuleList";
import video from '../video/sample_video.mp4';


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

  const [link, setLink] = useState("");
 
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
          // courseId: moduleArray[key].courseId,
          moduleId: moduleArray[key].moduleId,
          name: moduleArray[key].moduleName,
          pdf: moduleArray[key].modulePdfUrl,
          footage: moduleArray[key].moduleVideoUrl,
          // moduleType: moduleArray[key].moduleType,
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


  const videoLinkHandler = (link1)=>{
   
    setLink(link1)
  }

  const courseModuleList = modules.map((module) => (
    <CourseModuleList
      videoLink = {videoLinkHandler}
      key={module.id}
      id={module.moduleId}
      name={module.name}
      pdf={module.pdf}
      footage={module.footage}
      // moduleType={module.moduleType}
      // url={module.courseUrl}
      // api={module.moduleApi}
      // description={course.description}
    />


  ));



  

  return (
    <section className={classes.page}>

      {/* <p>{location.state.id}</p> */}
        <h3>Modules</h3>
      <section className={classes.courses}>
        
        <ul>{courseModuleList}</ul>
        <section className={classes.aa}>

          <iframe src={link}
                className={classes.player}
                  // width="640" 
                  // height="480" 
                  >
          </iframe>

          {/* <video className={classes.player} autoPlay controls onDurationChangeCapture>
                    <source src={link}  type="video/mp4" />
          </video> */}

        </section>
      </section>
      
      
    </section>
  );

  return(
    <div>
      <select>

      </select>
    </div>
  )
}

export default CourseInterface;