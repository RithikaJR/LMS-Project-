import { useEffect } from "react";
import UserProfile from "./UserProfile";
import './EmployeeProfile.css';


const EmployeeProfile = (props) => {

    useEffect(() => {
        
    })

    return(
        <div className="profile">
              <h2>Update Profile</h2>
              <UserProfile name={props.name} employeeId={props.employeeId}/>
        </div> 

    )

}

export default EmployeeProfile;