import classes from '../Notification/Notification.module.css';
import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import approval from '../images/approval.png';
import reject from '../images/reject.png';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import '../Login//ForgotPassword.css';
import close from '../images/blue_close.png';

import ApprovalList from './ApprovalList';

const Notification = ()=>{
  const columns =
    [
      {
        name: 'Employee ID',
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
            onClick={approveHandler}
          >Approve</button>
        ),
    
      }, 
      {
          name: 'Reject',
          cell:({id}) => (
            <button
              value={id}
              onClick={showOverlayHandler}
  
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
    const current = new Date();
    const date1 = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const [approvalList, setApprovalList] = useState([]);
    const [employeeId, setemployeeId] = useState();
    const [courseId, setcourseId] = useState(100);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
    const [date, setDate] = useState(null);
    const [overlayShown, setoverlayIsShown] = useState(false);
    const [enteredReason, setenteredReason] = useState('');
    const [clickedId, setClickedId] = useState(0);

   
    
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

          // console.log(responseData);
          // let count=0;
          for (const key in listArray) {
            // if(listArray[key].approvalStatus === "pending"){
              // console.log(key);
            loadedApprovalList.push({
              id: key,
              courseApprovalId:listArray[key].courseApprovalId,
              employeeName: listArray[key].employeeName,
              employeeId: listArray[key].employeeId,
              courseId: listArray[key].courseId,
              courseName: listArray[key].courseName,
              approvalStatus:listArray[key].approvalStatus,
              employeeEmail:listArray[key].employeeEmail
            });
            // count+=1
          //}
          }
          setApprovalList(loadedApprovalList);
        
          setIsLoading(false);
        };
    
        courseApprovalList().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        });

      

    }, [approvalList]);

   

    const approveHandler = (event) =>{
      console.log("empId"+approvalList[event.target.value].employeeId)
      event.preventDefault();
      //post api for enrolled course
      fetch("http://localhost:8080/api/course/enroll-course", {
        
            headers: { "Content-Type": "application/json", 'Authorization':token },
            method: "POST",
            body: JSON.stringify(
              {
                employeeId:{
                   employeeId: approvalList[event.target.value].employeeId
                    },
                courseId:{
                   courseId:approvalList[event.target.value].courseId
                    },
                enrolledDate:date1
            })
            
          }).then(response => {
            console.log("hello change");
            console.log(approvalList[event.target.value].employeeId)
          
            alert("Status approved") 
            console.log("request: ", response);
            
            return response.json();
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
    

    const showOverlayHandler = (event) => {
      setClickedId(event.target.value);
      console.log("clickedId",clickedId);
      setoverlayIsShown(true);
      
      
      
    };
  
    const hideOverlayHandler = () => {
      setoverlayIsShown(false);
    };

    const reasonHandler = (event) =>{
      setenteredReason(event.target.value);
    }
    const rejectHandler = (event) =>{   
      event.preventDefault();
      console.log('clicked'+approvalList[clickedId].courseApprovalId); 
       
      setemployeeId(approvalList[clickedId].employeeId);
      console.log("zcfd"+employeeId);
      
       
       
        //put api for course approval
         fetch("http://localhost:8080/api/course-approval/"+approvalList[clickedId].courseApprovalId, {
        
         headers: { "Content-Type": "application/json", 'Authorization':token },
         method: "PUT",
         body: JSON.stringify({
          
             approvalStatus : "Rejected"
         })
         
       }).then(response => {
         console.log("Rejected");
         console.log('clicked'+approvalList[clickedId].employeeEmail);
         console.log('clicked'+approvalList[clickedId].employeeName);
         console.log('clicked'+approvalList[clickedId].courseName);
         alert("Status rejected") 
         console.log("request: ", response);
         return response.json();
       }) 

       //post api for email

       fetch("http://localhost:8080/api/course/reject-mail-notify", {
        
       headers: { "Content-Type": "application/json", 'Authorization':token },
       method: "POST",
       body: JSON.stringify(
        
        {

          employeeEmail:approvalList[clickedId].employeeEmail,
      
          employeeName:approvalList[clickedId].employeeName,
      
          courseName:approvalList[clickedId].courseName,

          rejectionReason:enteredReason
      
      }
       )
       
     }).then(response => {
       console.log("Rejected"); 
       console.log("request: ", response);
       return response.json();
     }) 
     setenteredReason('');
    }


   



    return(
      <Fragment>
        <div className={classes.tablee}>
        <DataTable 
            title="Approval Request"
            columns={columns}
            data={approvalList}
            pagination
            highlightOnHover
            
          />
            </div>
            
            <div>
            {overlayShown && 
            <Modal onClose={overlayShown} className="overlay">
              <div className='close_password'>
                <Button onClick={hideOverlayHandler}><img src={close}/></Button>
              </div>
              <div className='password_change'>
                <h2>Reason for Rejection</h2>
                <form onSubmit={rejectHandler}>
                  <label>
                    Enter Reason
                  </label>
                  <input type="text" 
                                             value={enteredReason} 
                                             required 
                                             placeholder='Enter your reason' 
                                             onChange={reasonHandler}/>
                <div className='password_submit'>
                  <Button  type='submit'>Submit</Button>
                </div>
                </form>
              </div>
            </Modal>}
            </div>
        
            </Fragment>
        
    );
};

  export default Notification;


