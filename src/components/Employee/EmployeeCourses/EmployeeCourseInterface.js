import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from './EmployeeCourseInterface.module.css';
import jsPDF from 'jspdf';
import CourseRating from "../../Users/CourseRating";
import { Button } from "react-bootstrap";
import EmployeeCourseModuleList from "./EmployeeCourseModuleList";
import Modal from "../../UI/Modal/Modal";
import { exportComponentAsPNG } from "react-component-export-image";
import close from '../../images/blue_close.png';
import complete from '../../images/course_completed.png';
import Certificate from "../Certificate";

const EmployeeCourseInterface = (props) => {

  let token = `Bearer ${sessionStorage.getItem('jwt')}`;
  let Username = localStorage.getItem('LoggedName');
  
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const [link, setLink] = useState("");
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState(true);
  const [downloadCertificate, setDownloadCertificate] = useState(true);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [check, setCheck] = useState(false);
 
//   const [courseId, setCurseId] = useState(location.state.id);
  // let location = useLocation();
  // const propdata = location.state.id;
  let propdata = sessionStorage.getItem('courseId')
  let duration = sessionStorage.getItem('courseDuration')

  let arr = duration.split(":");
  let pre_timer = arr[0]*3600000 + arr[1]*60000 +arr[2]*1000;
  let timer = (pre_timer * 80)/100;
  console.log(pre_timer)
  console.log(timer);


  console.log("interface "+propdata);
  console.log("duration"+duration);

  useEffect(() => {
    const fetchModules = async () => {
      let response;
        response = await fetch(
          'http://localhost:8080/api/courses/'+propdata+'/modules',{
            headers:{
              'Authorization':token
            }
          });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedCourses = [];
      const moduleArray = {...responseData._embedded.module};

      for (const key in moduleArray) {
        loadedCourses.push({
          id: key,
          // courseId: moduleArray[key].courseId,
          moduleId: moduleArray[key].moduleId,
          name: moduleArray[key].moduleName,
          // pdf: moduleArray[key].modulePdfUrl,
          // footage: moduleArray[key].moduleVideoUrl,
        });
      }
      setModules(loadedCourses);
      setIsLoading(false);
    };

    fetchModules().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    //   setTimeout(() => {
    //     setDownloadCertificate(false);
    //  }, pre_timer);

    // if(props.moduleCheck === true){
    //   setCheck(true)
    // }
    // else{
    //   setCheck(false)
    // }

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

  

const hideCartHandler = () => {
  setCartIsShown(false);
};

// const downloadHandler = () => {
//   setDownloadCertificate(true);
//   setCartIsShown(true);
// }

  const handleChange = () => {
    setChecked(true);
  }

  const videoLinkHandler = (link1)=>{
   
    setLink(link1)
  }

  const moduleCheck =(value)=> {
    if(value===true){
      setCheck(true)
      setDownloadCertificate(false);
    }else{
      setCheck(false)
    }
  }

  const courseModuleList = modules.map((module) => (
    <EmployeeCourseModuleList
      moduleCheck={moduleCheck}
      videooLink = {videoLinkHandler}
      key={module.id}
      id={module.moduleId}
      name={module.name}
      // pdf={module.pdf}
      // footage={module.footage}
    />
    ));

  return (
    <section className={classes.page}>
      <div className={classes.cert}>
          <h3>Modules
            {check && 
            <img src={complete} />
            }
          </h3>
          <Button  disabled={downloadCertificate}>Download Certificate</Button>
      </div>
      {/* onClick={downloadHandler} */}
      <div className={classes.rating}>
        <CourseRating />
      </div>
    
    <section className={classes.courses}>
      <ul>{courseModuleList}</ul>     
    <section className={classes.aa}>
      <iframe src={link}
            // onClick={clickHandler}
            className={classes.player}
            autoplay
            allowFullScreen="true">
      </iframe>
    </section>
  </section>
  
  
</section>
  );
}

export default EmployeeCourseInterface;