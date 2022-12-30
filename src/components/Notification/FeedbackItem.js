import { message } from 'antd';
import { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import classes from './FeedbackItem.module.css'

const FeedbackItem = (props) => {

  const [clickButton, setClickButton] = useState(false);

  let token = `Bearer ${sessionStorage.getItem('jwt')}`;

  useEffect(()=>{
    if(props.status == false){
      setClickButton(true)
    }
    else {
      setClickButton(false)
    }
  },[])

  const showCartHandler = async () => {

    try {
      let res = await fetch("http://localhost:8080/api/feedback-form/"+props.id, {
        method: "PUT",
        headers: {"content-type": "application/json" ,'Authorization':token},
        body: JSON.stringify(
          {
            status:true,
          } ),
      });
      if (res.status === 200) 
      {
        message.success("Responded To FeedBack")
      } else 
      {
        message.error("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }    

    setClickButton(false);
    };
    
    return (
      <li className={classes.border}>
        <div className={classes.wrap}>
          <div className={classes.element}>Employee Name : {props.employeeName}</div>
          <div className={classes.element}>Feedback: {props.feedback}</div>
          {clickButton ? 
            <Button onClick={showCartHandler} >Accept</Button> :
            <Button onClick={showCartHandler} disabled="true">Accepted</Button>
          }
          

        </div>
        
      </li>
    );
  };
  
  export default FeedbackItem;