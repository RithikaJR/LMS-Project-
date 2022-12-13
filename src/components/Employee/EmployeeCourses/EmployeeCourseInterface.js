import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from './EmployeeCourseInterface.module.css';
import jsPDF from 'jspdf';
import CourseRating from "../../Users/CourseRating";
import { Button } from "react-bootstrap";
import EmployeeCourseModuleList from "./EmployeeCourseModuleList";

const EmployeeCourseInterface = (props) => {
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
          'http://localhost:8080/api/courses/'+propdata+'/modules');

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
          pdf: moduleArray[key].modulePdfUrl,
          footage: moduleArray[key].moduleVideoUrl,
          // moduleType: moduleArray[key].moduleType,
          // description: moduleArray[key].courseDescription,
        });
      }
      setModules(loadedCourses);
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
    doc.save("Certificate.pdf");
   
}

  const handleChange = () => {
    setChecked(true);
  }

  const videoLinkHandler = (link1)=>{
   
    setLink(link1)
  }

  const courseModuleList = modules.map((module) => (
    <EmployeeCourseModuleList
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

  return (
    <section className={classes.page}>
    <div className={classes.cert}>
      <h3>Modules</h3>
      <Button  onClick={jsPdfGenerator} disabled={true}>Download Certificate ⬇</Button>
    </div>
    <div disabled={true}>
    <CourseRating />
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

export default EmployeeCourseInterface;