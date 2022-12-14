import { useState } from "react";
import Button from "../UI/Button/Button";
import './ChangePassword.css'

import { useEffect } from "react";
import { message } from "antd";


const ChangePassword = (props)=>{
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;


    
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [validatenewPwd, setvalidateNewPwd] = useState();
    const [currentPwd, setcurrentPwd] = useState("");
    
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('')
    const [ConfirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')

    const [formIsValid, setFormIsValid] = useState(false);

    let newPasswordErrorMsg = "1.Password must have at least one non-alphabetic character.\n2.Password must have atleast one digit (0-9)\n3.Password must have a length of 6 characters."

    useEffect(() =>{
      const identifier =setTimeout(() =>{
        console.log("Validity Check");
        
        if(specialCharRegExp.test(newPwd) === true && digitsRegExp.test(newPwd) === true && newPwd !== ''){
          console.log("deqf")
          setNewPasswordErrorMessage("")
          if(confirmPwd == newPwd){
            setConfirmPasswordErrorMessage("");
            setFormIsValid(true)
          }
        }

        
          
      }, 500)
  
      return () => {
        console.log('CLEANUP');
        clearTimeout(identifier);
      };
    }, [newPwd,confirmPwd]) 

    const changePasswordHandler = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/user/change-password", {
      
          headers: { "Content-Type": "application/json", 'Authorization':token},
          method: "POST",
          body: JSON.stringify({
            employeeId :props.employeeId,
            newPassword:confirmPwd,
            currentPassword:currentPwd,
          })
          
        }).then(response => {
          
            console.log(confirmPwd)
            console.log(currentPwd)
            console.log("request: ", response);
          return response.json();
          
        })
        
        .then(resJson => {
          if(resJson.changePasswordStatus !== null){
            // alert(resJson.changePasswordStatus)
            message.success(resJson.changePasswordStatus)
            // console.log("resonse: ", resJson.changePasswordStatus);
            fetch("http://localhost:8080/api/status-update/"+props.userId, {
        
            headers: { "Content-Type": "application/json", 'Authorization':token},
            method: "PUT",
            body: JSON.stringify({
              initialStatus : true,
            })
          })

            setcurrentPwd("")
            setNewPwd("");
            setConfirmPwd("");
            // props.changePassword(false)
          }else{
            message.error("Current password is wrong")
          }
          
          
       })
       
    };
        const comfirmPassword=(event)=>{
            setConfirmPwd(event.target.value)
        }
        const newPassword=(event)=>{
          setNewPwd(event.target.value)   
        }
        const validatenewPassword=()=>{
          if(specialCharRegExp.test(newPwd) !== true || digitsRegExp.test(newPwd) !== true || newPwd === ''){
            setNewPasswordErrorMessage(newPasswordErrorMsg );
            setFormIsValid(false)
          }
        }

        const validateConfirmPassword=()=>{
          if(confirmPwd !== newPwd){
            setConfirmPasswordErrorMessage("Password not match" );
            setFormIsValid(false)
          }
        }

        
        const currentPasswordChange=(event)=>{
          setcurrentPwd(event.target.value)
          
      }

    return(
      <div className="passwordchange">
        <div className="line">
        </div>
        <div className="changePassword">
            <form onSubmit={changePasswordHandler}>
              <table>
                <tr>
                  <td><b>Current Password:</b></td>
                  <td><input className="input" onChange={currentPasswordChange} value={currentPwd} type="password" placeholder='********' required/><br></br></td>
                </tr>
                <tr>
                  <td><b>New Password:</b></td>
                  <td><input className="input" onChange={newPassword} value={newPwd} onBlur={validatenewPassword} type="password" placeholder='********' required/>
                  </td>
                  
                </tr>
                <tr>
                  <td></td>
                  <td>{newPasswordErrorMessage === '' ? null :
                      <div className='errorMessage'><ol><li>Password must have at least one non-alphabetic character.</li><li>Password must have atleast one digit (0-9)</li><li>Password must have a length of 6 characters.</li></ol></div>}</td>
                </tr>
                
                <tr>
                  <td><b>Confirm Password:</b></td>
                  <td><input className="input" onChange={comfirmPassword}  onBlur={validateConfirmPassword} value={confirmPwd} type="password" placeholder='********' required/><br></br></td>
                </tr>

                <tr>
                  <td></td>
                  <td>{ConfirmPasswordErrorMessage === '' ? null :
                      <div className='errorMessage'>{ConfirmPasswordErrorMessage}</div>}</td>
                </tr>

              </table>

                 
                <Button type="submit" disabled={!formIsValid}><b>Change Password</b></Button>
            </form>
        </div>
      </div>
    )

}

export default ChangePassword;