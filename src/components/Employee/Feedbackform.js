import React, { useState } from "react";
import Button from "../UI/Button/Button.js";
import classes from './Feedbackform.module.css';
import Axios from 'axios';


const FeedbackForm = (props) => {

  let token = `Bearer ${sessionStorage.getItem('jwt')}`;

  const [submitted, setSubmitted] = useState(false);
  const [feedback,setFeedback] = useState({
    employee_Id: props.employeeId,
    employee_name:props.name,
    feedback_desc:"",
  });


const url = "http://localhost:8080/api/feedback-form";


function handleFeedback(e1){
  const newdata = {...feedback}
  newdata[e1.target.id] = e1.target.value
  setFeedback(newdata)
  console.log(newdata)
}


function submitFeedback(e1){
  e1.preventDefault();
  Axios.post(url,{
    employeeId:feedback.employee_Id,
    employeeName:feedback.employee_name,
    feedback:feedback.feedback_desc
  },
  {headers:{
      'Authorization':token
    }})

 

  .then(res=>{
    if(res.data != null){
      alert("Thank you for your feedback!")
      setFeedback({
        feedback_desc:""
      })
    }
    console.log("res"+res.data)
  })
}

  return (

    <div className={classes.loginPage}>
   
      <form>

          <div className={classes.login}>
            <h2>Feedback</h2>
            <div className={classes.controll}>
              <textarea
                placeholder="Your feedback"
                id="feedback_desc"
                onChange={(e1)=>handleFeedback(e1)}
                value={feedback.feedback_desc}
                required/>
            </div>
            <div className="classes.control">
              <Button type='submit' onClick={(e1)=>submitFeedback(e1)}>
                Send Feedback
              </Button>
            </div>
          </div>
      </form>
    </div>
  );
};

export default FeedbackForm;