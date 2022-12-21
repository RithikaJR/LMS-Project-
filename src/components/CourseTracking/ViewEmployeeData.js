import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import EnrollTableItem from "./EnrollTableItem";
import classes from './ViewEmployeeData.module.css'


const ViewEmployeeData = (props) => {

    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    const [enrolledCourse, setEnrolledCourse] = useState([]);
    const [completedCourse, setCompletedCourse] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingComplete, setIsLoadingComplete] = useState(true);
    const [httpError, setHttpError] = useState();
    const [httpErrorComplete, setHttpErrorComplete] = useState();

    let location = useLocation();
    const employeeId = location.state.id;
    const employeeName = location.state.fname +" "+ location.state.lname;
    const employeeEmail = location.state.email
    console.log("data "+employeeId);
    console.log("data "+employeeName);
    console.log("data "+employeeEmail);


    useEffect(() => {
        const fetchEnrolledCourses = async () => {
          let response;
            response = await fetch(
              'http://localhost:8080/api/course/get-enrolled-course/'+employeeId,{
                headers:{
                  'Authorization':token
                }
              });
          
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const responseData = await response.json();
    
          const loadedCourses = [];
          const courseArray = {...responseData};
  
          console.log(responseData);
          for (const key in courseArray) {
            loadedCourses.push({
              id: key,
              courseId: courseArray[key].courseId,
              name: courseArray[key].courseName,
            //   description: courseArray[key].courseDescription,
            //   image: courseArray[key].courseImageUrl,
              duration: courseArray[key].courseDuration,
            //   rating:courseArray[key].courseRating,
              
            });
          }
    
          setEnrolledCourse(loadedCourses);
          console.log(loadedCourses);
          setIsLoading(false);
        };
    
        fetchEnrolledCourses().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });

        const fetchCompletedCourses = async () => {
            let response;
              response = await fetch(
                'http://localhost:8080/api/course/get-enrolled-course/'+employeeId,{
                  headers:{
                    'Authorization':token
                  }
                });
            
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
      
            const responseDataComplete = await response.json();
      
            const loadedCoursesComplete = [];
            const courseArrayComplete = {...responseDataComplete};
    
            console.log(responseDataComplete);
            for (const key in courseArrayComplete) {
                loadedCoursesComplete.push({
                id: key,
                complete_Id: courseArrayComplete[key].completedCourseId,
                completeCourseId: courseArrayComplete[key].courseId,
                completeCourseName:courseArrayComplete[key].courseName,
                
              });
            }
      
            setCompletedCourse(loadedCoursesComplete);
            console.log(loadedCoursesComplete);
            setIsLoadingComplete(false);
          };
      
          fetchCompletedCourses().catch((error) => {
            setIsLoadingComplete(false);
            setHttpErrorComplete(error.message);
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

      const enrolledcourseslist = enrolledCourse.map((enroll) =>(
        <EnrollTableItem id={enroll.courseId}
                         name={enroll.name}
                         duration={enroll.duration} />
      ));

    //   const completedcourseslist = completedCourse.map((complete) =>(
    //     <EnrollTableItem id={complete.courseId}
    //                      name={complete.name}
    //                      duration={complete.duration} />
    //   ));


    return(
        <div>
            <div className={classes.employeedata}>
                <div className={classes.head_employeedata}>
                    <h1>{employeeName}</h1>
                    <h4>Employee ID : {employeeId}</h4>
                    <div className={classes.progressbar}>

                    </div>
                </div>
                <div className={classes.report}>
                    <h3>Reports</h3>
                    <div className={classes.tables}>
                        <div className={classes.enroll}>
                            <div>
                                <h3>Enrolled Courses</h3>
                            </div>
                            <div>
                                <ol>{enrolledcourseslist}</ol>
                            </div>
                        </div>
                        <div className={classes.complete}>
                            <div>
                                <h3>Completed Courses</h3>
                            </div>
                            <div>
                                <ol>{enrolledcourseslist}</ol>
                            </div>
                        </div>
                    </div>

                </div>
                

                
            </div>
        </div>
    )
}

export default ViewEmployeeData;