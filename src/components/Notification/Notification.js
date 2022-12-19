import classes from '../Notification/Notification.module.css';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import approval from '../images/approval.png';
import reject from '../images/reject.png';


// import classes from '../Employee/EmployeeCourses/EmployeeAvailableCourses.module.css'
import App from '../../App';
import ApprovalList from './ApprovalList';

const Notification = ()=>{
  const columns =
    [
      {
        name: ' ID',
        selector: 'employeeId',
        sortable: true,
      },
      {
        name: ' Name',
        selector: 'employeeName',
        sortable: true,
      },
  
      {
          name: 'Course Name',
          selector: 'courseName',
          sortable: true,   
      },
      
    
      {
        name: 'Approve',      
        cell:(row) => (
          <button 
            value={row}
            // onClick={(e) => handleInputChange(row, "surname", e)}
            onClick={approveHandler}
          ><img src={approval}/></button>
        ),
    
      }, 
      {
          name: 'Reject',
          cell:(row) => (
            <button
              // value={row.surname}
              // onClick={(e) => handleInputChange(row, "surname", e)}
              onClick={rejectHandler}
  
            ><img src={reject}/></button>
           
          ),
      
        },
  
  
    ];
  
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    const [approvalList, setApprovalList] = useState([]);
    const [employeeId, setemployeeId] = useState();
    const [courseId, setcourseId] = useState(100);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [date, setDate] = useState(null);


    useEffect(() => {
      const courseApprovalList = async () => { 
        let response = await fetch(
              'http://localhost:8080/api/course-approval',{
            headers:{
              'Authorization':token
            }
          });
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const responseData = await response.json();
          const loadedApprovalList = [];
          const listArray = {...responseData._embedded.courseApproval};

          console.log(responseData);
          for (const key in listArray) {
            loadedApprovalList.push({
              id: key,
              employeeName: listArray[key].employeeName,
              employeeId: listArray[key].employeeId,
              courseName: listArray[key].courseName,
            });
          }
    
          setApprovalList(loadedApprovalList);
          // setemployeeId(employeeId);
          // setcourseId(courseId);
          setIsLoading(false);
        };
    
        courseApprovalList().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });

        {approvalList.map((user) =>{
          setemployeeId(user.employeeId);
        })}
        console.log(employeeId);

    }, []);
    

    const approveHandler = (event) =>{
      console.log("empid"+ event.target.value);    
      console.log('clicked'); 
  
      event.preventDefault();
      fetch("http://localhost:8080/api/enroll-course", {
        
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              // employeeId:{
              //   employeeId:employeeId,
              // },
              // employeeId: employeeId,
              // courseId: courseId,
              // enrolledDate:date

              courseId:{
    
                courseId:courseId
                
                },
                employeeId:{
                    
                    employeeId:employeeId
                    },
                enrolledDate:date
            })
            
          }).then(response => {
            console.log("hello change");
            console.log(employeeId)
            // console.log(changePwd)
            // console.log(currentPwd)
            alert("Status approved Successfully") 
            console.log("request: ", response);
            
            return response.json();
          })
          
          .then(resJson => {
            // alert("Password Change Successfully")
         })
    }
  
    const rejectHandler = (event) =>{
      console.log('clicked'); 
    }



    // users.map((course) => {
    //     setemployeeId(course.employeeId)
    //     // setcourseId(course.courseId)
    //     // <ApprovalList
    //     //   key={course.courseApprovalId}
    //     //   id={course.courseApprovalId}
    //     //   employeeName={course.employeeName}
    //     //   employeeId={course.employeeId}
    //     //   // employeeLastName={course.employeeLastName}
    //     //   courseName={course.courseName}
    //     // />
    //   });

    // {users.map((user) =>{
    //   setemployeeId(user.employeeId);
    // })}

    

    return(
        <div className={classes.tablee}>
        <DataTable 
            title="Approval Request"
            columns={columns}
            data={approvalList}
            pagination
            highlightOnHover
            
          />
      </div>
        
    );
};




  export default Notification;


