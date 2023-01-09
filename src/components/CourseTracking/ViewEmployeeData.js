import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CompletedTableItem from "./CompletedTableItem";
import EnrollTableItem from "./EnrollTableItem";
import classes from './ViewEmployeeData.module.css'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ViewEmployeeData = (props) => {

  let token = `Bearer ${sessionStorage.getItem('jwt')}`;

  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [completedCourse, setCompletedCourse] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComplete, setIsLoadingComplete] = useState(true);
  const [httpError, setHttpError] = useState();
  const [httpErrorComplete, setHttpErrorComplete] = useState();
  const [courseId, setCourseId] = useState();
  const [courseName, setCourseName] = useState();
  const [completeCourseName, setCompleteCourseName] = useState();
  const [percentage, setPercentage] = useState(0);

  let location = useLocation();
  const employeeId = location.state.id;
  const employeeName = location.state.fname + " " + location.state.lname;
  const employeeEmail = location.state.email;


  console.log("data " + employeeId);
  console.log("data " + employeeName);
  console.log("data " + employeeEmail);

    const progress = (completedCourse.length / enrolledCourse.length) * 100;
    console.log("progress"+ progress)

    // let complete_course_name;
  


  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      let response;
      response = await fetch(
        'http://localhost:8080/api/course/get-enrolled-course/' + employeeId, {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedCourses = [];
      const courseArray = { ...responseData.coursesEnrolled };

      console.log("sssSS"+responseData);
      for (const key in courseArray) {
        loadedCourses.push({
          id: key,
          courseId: courseArray[key].courseId,
          name: courseArray[key].courseName,
          duration: courseArray[key].courseDuration,

        });
      }
      setEnrolledCourse(loadedCourses);
      console.log("loadd"+loadedCourses);
      setIsLoading(false);
    };

    fetchEnrolledCourses().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });


    const fetchCompletedCourses = async () => {
      let response;
      response = await fetch(
        'http://localhost:8080/api/completed-course/search/findByemployeeId?id=' + employeeId, {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!'); 
      }

      const responseDataComplete = await response.json();

      const loadedCoursesComplete = [];
      const courseArrayComplete = { ...responseDataComplete._embedded.completedCourse };

      console.log("sdfsf");
      for (const key in courseArrayComplete) {
        loadedCoursesComplete.push({
          id: key,
          complete_Id: courseArrayComplete[key].completedCourseId,
          completeCourseId: courseArrayComplete[key].courseId,
          completeDate: courseArrayComplete[key].completed_date
        });
      }

      

      {completedCourse.map((complete) => {
        enrolledCourse.map((enroll) => {
          if(complete.completeCourseId == enroll.courseId){
            setCompleteCourseName(enroll.name);
          }
       })
      })}

      console.log("course ka name"+completeCourseName);
      setCompletedCourse(loadedCoursesComplete);
      setIsLoadingComplete(false);
    };

    fetchCompletedCourses().catch((error) => {
      setIsLoadingComplete(false);
      setHttpErrorComplete(error.message);
    });

    setTimeout(() => {
      setPercentage(progress);
     }, 500);


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


  if (isLoadingComplete) {
    return (
      <section className={classes.coursesLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpErrorComplete) {
    return (
      <section className={classes.coursesError}>
        <p>{httpErrorComplete}</p>
      </section>
    );
  }

  // let final_date = [];

  // {completedCourse.map((complete) => {
  //   let recieved_date = complete.completeDate;
  //   let arr = recieved_date.split("T");
  //   let date_arr = arr[0].split("-");
  //   final_date = date_arr[2]+"/"+date_arr[1]+"/"+date_arr[0];
  // })}

  const enrolledcourseslist = enrolledCourse.map((enroll) => (
    <EnrollTableItem  id={enroll.courseId}
                      name={enroll.name}
                      duration={enroll.duration} />
  ));

  const completedcourseslist = completedCourse.map((complete) => (
    <CompletedTableItem id={complete.complete_Id}
                       course_name={completeCourseName}
                      //  complete_date={final_date}
                       complete_date={complete.completeDate}
                     />
  ));


  return (
    <div>
      <div className={classes.employeedata}>
        <div className={classes.head_employeedata}>
          <div className={classes.emp_text}>
            <h1>{employeeName}</h1>
            <h4>Employee ID : {employeeId}</h4>
          </div>
          <div className={classes.progressbar} style={{ width: 250, height: 250 }}>
            <CircularProgressbar 
                        value={percentage} 
                        text={`${percentage}%`}
                        styles={buildStyles({
                                pathTransitionDuration: 0.5,
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center'},)} />
          </div>
        </div>
        <div className={classes.report}>
          <h2>Reports</h2>
          <div className={classes.tables}>
            <div className={classes.enroll}>
              <div className={classes.heading_enroll}>
                <h3>Enrolled Courses</h3>
              </div>
              <div className={classes.enroll_list}>
                <ol>{enrolledcourseslist}</ol>
              </div>
            </div>
            <div className={classes.complete}>
              <div className={classes.heading_complete}>
                <h3>Completed Courses</h3>
              </div>
              <div className={classes.enroll_list}>
                <ol>{completedcourseslist}</ol>
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  )
}

export default ViewEmployeeData;