import { useState } from "react";
import Button from "../UI/Button/Button";
import './ChangePassword.css'
const ChangePassword = (props)=>{
    const [confirmPwd, setConfirmPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [currentPwd, setcurrentPwd] = useState("");
    
    const changePasswordHandler = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/user/change-password", {
      
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            employeeId :props.employeeId,
            // props.employeeId
            newPassword:confirmPwd,
            currentPassword:currentPwd,
          })
          
        }).then(response => {
          
            // console.log(response.statusText)
            console.log(confirmPwd)
            console.log(currentPwd)
            // alert("Password Change Successfully") 
            console.log("request: ", response);
          // return response.json();
          
        })
        .then(resJson => {
          alert("Password Change Successfully")
          setcurrentPwd("")
          setNewPwd("");
          setConfirmPwd("");
          // props.changePassword(false)
          
       })
       
    };
        const comfirmPassword=(event)=>{
          // if(newPwd === event.target.value){
            setConfirmPwd(event.target.value)
          // }else{
          //   console.log("Your New Password and Confirm password do not match")
          // }
          
        }
        const newPassword=(event)=>{
          setNewPwd(event.target.value)
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
                  <td><input className="input" onChange={newPassword} value={newPwd} type="password" placeholder='********' required/><br></br></td>
                </tr>
                <tr>
                  <td><b>Confirm Password:</b></td>
                  <td><input className="input" onChange={comfirmPassword} value={confirmPwd} type="password" placeholder='********' required/><br></br></td>
                </tr>
              </table>
                 
                <Button type="submit"><b>Change Password</b></Button>
            </form>
        </div>
      </div>
    )

}

export default ChangePassword;