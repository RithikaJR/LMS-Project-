import { useLocation } from "react-router-dom";


const ViewEmployeeData = (props) => {

    let location = useLocation();
    const employeeId = location.state.id;
    const employeeName = location.state.fname
    const employeeEmail = location.state.email
    console.log("data "+employeeId);
    console.log("data "+employeeName);
    console.log("data "+employeeEmail);

    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1>{employeeId}</h1>
            <h1>Employee Analysis</h1>
            <h1>{employeeName}</h1>
            <h1>Employee Analysis</h1>
            <h1>{employeeEmail}</h1>
            <h1>Employee Analysis</h1>
        </div>
    )
}

export default ViewEmployeeData;