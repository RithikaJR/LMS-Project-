import { useState } from "react";
import Button from "../UI/Button/Button";
import './ChangePassword.css'


const ChangePassword = (props)=>{
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    const [confirmPwd, setConfirmPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [currentPwd, setcurrentPwd] = useState("");
    
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
            alert(resJson.changePasswordStatus)
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
            alert("Current password is wrong")
          }
          
          
       })
       
    };
        const comfirmPassword=(event)=>{
      
            setConfirmPwd(event.target.value)
        
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