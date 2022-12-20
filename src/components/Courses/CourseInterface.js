import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from './CourseInterface.module.css';
import CourseModuleList from "./CourseModuleList";
import jsPDF from 'jspdf';
import CourseRating from "../Users/CourseRating";
import './CourseInterface.css';


const CourseInterface = (props) => {
  
  let token = `Bearer ${sessionStorage.getItem('jwt')}`;

  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const [link, setLink] = useState("");
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState(true);
 
//   const [courseId, setCurseId] = useState(location.state.id);
  let location = useLocation();
  const propdata = location.state.id;
  console.log("interface "+propdata);

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

      // console.log(responseData);
      for (const key in moduleArray) {
        loadedCourses.push({
          id: key,
          moduleId: moduleArray[key].moduleId,
          name: moduleArray[key].moduleName,
          pdf: moduleArray[key].modulePdfUrl,
          footage: moduleArray[key].moduleVideoUrl,
        });
      }      
      setModules(loadedCourses);
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
    />
  ));

  
  return (
    <section className={classes.page}>
        <div className={classes.cert}>
          <h3>Modules</h3>
          <Button  onClick={jsPdfGenerator} disabled={true}>Download PDF</Button>
        </div>
        <div>
        <CourseRating />
        </div>
        
      <section className={classes.courses}>
        
        <ul>{courseModuleList}</ul>     
        <section className={classes.aa}>

          <iframe src={link}
                className={classes.player}>
          </iframe>       

        </section>
      </section>
      
      
    </section>
  );
}

export default CourseInterface;