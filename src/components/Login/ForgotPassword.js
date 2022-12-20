import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Modal from '../UI/Modal/Modal';
import classes from './ForgotPassword.module.css';
import close from '../images/blue_close.png';


const ForgotPassword = (props) => {
    const [overlayShown, setoverlayIsShown] = useState(false);
    const [enteredEmailId, setenteredEmailId] = useState('');

    const showOverlayHandler = () => {
        setoverlayIsShown(true);
      };
    
      const hideOverlayHandler = () => {
        setoverlayIsShown(false);
      };

      const emailHandler = (event) =>{
        setenteredEmailId(event.target.value);
      }

      const changePasswordHandler = (event)=>{
        event.preventDefault()
        fetch("http://localhost:8080/api/user/forget-password", {
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            method: "POST",
            body: new FormData(enteredEmailId)
            // // JSON.stringify({
            // {employeeEmail: enteredEmailId}
            // // })  
        }).then(response => {
            console.log("hello");
            console.log("request: ", response);
            alert("Check Your Registered mail Id")
            // return response.json();
        })
        
      }

    return(
        <div className={classes.forgotpassword}>
            <a href='#' onClick={showOverlayHandler}>Forgot Password</a>
            <div>
            {overlayShown && 
            <Modal onClose={overlayShown} className="overlay">
              <div className={classes.close}>
                <Button onClick={hideOverlayHandler}><img src={close}/></Button>
              </div>
              <div>
                <h2>Change Password</h2>
                <form onSubmit={changePasswordHandler}>
                  Registered Mail Id: <input type="email" 
                                             value={enteredEmailId} required placeholder='Enter your email id' onChange={emailHandler}/>
                <button type='submit'>Submit</button>
                </form>
              </div>
            </Modal>}
            </div>
        </div>
    )

}

export default ForgotPassword;