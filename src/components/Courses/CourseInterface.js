import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from './CourseInterface.module.css';
import CourseModuleList from "./CourseModuleList";
// import video from '../video/sample_video.mp4';
import jsPDF from 'jspdf';


import Collapsible from 'react-collapsible';
import { useSSRSafeId } from "@react-aria/ssr";


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
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState(true);
 
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


    // setTimeout(() => {
    //   setState(false);
    //  }, 9000);
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

  const jsPdfGenerator = () =>{
    var doc = new jsPDF('p','pt');
    doc.text(20,20,'Certificate');

    doc.text(80,40,'Course Category : Communication');
    doc.text(100,60,'Course Name : Leadership Skills');



    doc.save("generated.pdf");
   
}

  const handleChange = () => {
    setChecked(true);
  }

  const videoLinkHandler = (link1)=>{
   
    setLink(link1)
  }

  const courseModuleList = modules.map((module) => (
    <CourseModuleList
      videooLink = {videoLinkHandler}
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

  // onLaunchClicked (event) {
  //   event.preventDefault();
  //   this.setState({
  //       isButtonDisabled: true
  //   });



  

  return (
    <section className={classes.page}>
        <div className={classes.cert}>
          <h3>Modules</h3>
          <Button  onClick={jsPdfGenerator} disabled={true}>Download PDF</Button>
        </div>
        
      <section className={classes.courses}>
        
        <ul>{courseModuleList}</ul>     
        <section className={classes.aa}>

          <iframe src={link}
                className={classes.player}>
          </iframe>
          {/* <div className={classes.check}>
              <label>Completed?</label>
              <input type="checkbox"
                    onChange={handleChange}
                    disabled={state} />
          </div> */}
          

        </section>
      </section>
      
      
    </section>
  );
}

export default CourseInterface;