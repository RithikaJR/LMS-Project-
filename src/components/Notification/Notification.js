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
        cell:({id}) => (
          <button 
            value={id}
            // onClick={(e) => handleInputChange(row, "surname", e)}
            onClick={approveHandler}
          >Approve</button>
        ),
    
      }, 
      {
          name: 'Reject',
          cell:({id}) => (
            <button
              value={id}
              // onClick={(e) => handleInputChange(row, "surname", e)}
              onClick={rejectHandler}
  
            >Reject</button>
           
          ),
      
        },

        {
          name: 'Status',
          selector: 'approvalStatus',
          sortable: true,
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
          //get api for course approval
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
              courseApprovalId:listArray[key].courseApprovalId,
              employeeName: listArray[key].employeeName,
              employeeId: listArray[key].employeeId,
              courseId: listArray[key].courseId,
              courseName: listArray[key].courseName,
              approvalStatus:listArray[key].approvalStatus
            });
          }
    
          setApprovalList(loadedApprovalList);
        
          setIsLoading(false);
        };
    
        courseApprovalList().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });

      

    }, []);

   

    const approveHandler = (event) =>{
      event.preventDefault();
      //post api for enrolled course
      fetch("http://localhost:8080/api/enrolled-course", {
        
            headers: { "Content-Type": "application/json", 'Authorization':token },
            method: "POST",
            body: JSON.stringify({
                courseId:approvalList[event.target.value].courseId,
                employeeId:approvalList[event.target.value].employeeId,
                enrolledDate:date
            })
            
          }).then(response => {
            console.log("hello change");
            console.log(employeeId)
          
            alert("Status approved") 
            console.log("request: ", response);
            
            return response.json();
          })
          
          .then(resJson => { // alert("Password Change Successfully")
         })

         //put api for course approval 

         fetch("http://localhost:8080/api/course-approval/"+approvalList[event.target.value].courseApprovalId, {
        
         headers: { "Content-Type": "application/json", 'Authorization':token },
         method: "PUT",
         body: JSON.stringify({
          
             approvalStatus : "Approved"
         })
         
       }).then(response => {
         console.log("Approved");
        
         
         return response.json();
       })
      
    }
  
    const rejectHandler = (event) =>{   
      console.log('clicked'+approvalList[event.target.value].courseApprovalId); 
      setemployeeId(approvalList[event.target.value].employeeId);
      console.log("zcfd"+employeeId);
      
      event.preventDefault();
       
        //put api for course approval
         fetch("http://localhost:8080/api/course-approval/"+approvalList[event.target.value].courseApprovalId, {
        
         headers: { "Content-Type": "application/json", 'Authorization':token },
         method: "PUT",
         body: JSON.stringify({
          
             approvalStatus : "Rejected"
         })
         
       }).then(response => {
         console.log("Rejected");

         alert("Status rejected") 
         console.log("request: ", response);
         return response.json();
       }) 

       //put api 

       fetch("http://localhost:8080/api/course-approval/"+approvalList[event.target.value].courseApprovalId, {
        
       headers: { "Content-Type": "application/json", 'Authorization':token },
       method: "PUT",
       body: JSON.stringify({
        
           //email : email
       })
       
     }).then(response => {
       console.log("Rejected");

      //  alert("Status rejected") 
       console.log("request: ", response);
       return response.json();
     }) 
    }


    


    

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


