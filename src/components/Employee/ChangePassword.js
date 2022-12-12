import { useState } from "react";
import { Button } from "react-bootstrap";
import './ChangePassword.css'
const ChangePassword = (props)=>{
    const [changePwd, setChangePwd] = useState("");
    const [currentPwd, setcurrentPwd] = useState("");
    const changePasswordHandler = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/user/change-password", {
      
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            employeeId :props.employeeId,
            // props.employeeId
            newPassword:changePwd,
            currentPassword:currentPwd,
          })
          
        }).then(response => {
          console.log("hello change");
          console.log(props.employeeId)
          console.log(changePwd)
          console.log(currentPwd)
          alert("Password Change Successfully") 
          console.log("request: ", response);
          
          return response.json();
        })
        .then(resJson => {
          // alert("Password Change Successfully")
       })
       
    };
        const passwordChange=(event)=>{
            setChangePwd(event.target.value)
        }
        const currentPasswordChange=(event)=>{
          setcurrentPwd(event.target.value)
      }

    return(
        <div className="changePassword">
            <form onSubmit={changePasswordHandler}>
              <table>
                <tr>
                  <td>Current Password:</td>
                  <td><input className="input" onChange={currentPasswordChange} type="password" placeholder='********'/><br></br></td>
                </tr>
                <tr>
                  <td>New Password: </td>
                  <td><input className="input" type="password" placeholder='********'/><br></br></td>
                </tr>
                <tr>
                  <td>Confirm Password: </td>
                  <td><input className="input" onChange={passwordChange} type="password" placeholder='********'/><br></br></td>
                </tr>
              </table>
                 
                
                
                <button>Change Password</button>
            </form>
        </div>
    )

}

export default ChangePassword;