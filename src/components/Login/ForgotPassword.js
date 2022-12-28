import { useState } from 'react';
import { Alert} from 'react-bootstrap';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import './ForgotPassword.css';
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
            body:"employeeEmail="+enteredEmailId

        }).then(response => {
            alert("Check Your Registered mail Id")
        })
        setenteredEmailId("")
        setoverlayIsShown(false)
      }

    return(
        <div className='forgotpassword'>
            <a href='#' onClick={showOverlayHandler}>Forgot Password</a>
            <div>
            {overlayShown && 
            <Modal onClose={overlayShown} className="overlay">
              <div className='close_password'>
                <Button onClick={hideOverlayHandler}><img src={close}/></Button>
              </div>
              <div className='password_change'>
                <h2>Change Password</h2>
                <form >
                  <label>
                    Registered Mail Id
                  </label>
                  <input type="email" 
                                             value={enteredEmailId} 
                                             required 
                                             placeholder='Enter your email id' 
                                             onChange={emailHandler}/>
                <div className='password_submit'>
                  <Button onClick={changePasswordHandler} type='submit'>Submit</Button>
                </div>
                </form>
              </div>
            </Modal>}
            </div>
        </div>
    )

}

export default ForgotPassword;