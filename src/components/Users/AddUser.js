import React, {useState, useEffect}  from 'react'; 
import axios, { Axios } from 'axios';
import classes from './AddUser.module.css';
import Button from '../UI/Button/Button';
// import classes from "./UserPage.module.css";

const AddUser =()=> {
    const [users, setUser] = useState([])
    const [enteredid, setenteredid] = useState('');
    const [enteredrole, setenteredrole] = useState('');
    
const changeidHandler= (e) => {
    setenteredid(e.target.value);
}  

const changeroleHandler= (e) => {
    setenteredrole(e.target.value);
}  

let submitHandler = async (e) => {
    e.preventDefault();

    
    try {
      let res = await fetch('http://localhost:8080/api/userupdate/${enteredid}', {
        method: "PUT",  
    }
      )
    }
    catch (err) {
        console.log(err);
      }
  };

    // function submitHandler()
    // {
    //   let item={enteredid,enteredrole}
    //   console.warn("item",item)
    //   fetch(`http://localhost:8080/api/userupdate/${enteredid}`, {
    //     method: 'PUT',
    //     headers:{
    //       'Accept':'application/json',
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify(item)
    //   }).then((result) => {
    //     result.json().then((resp) => {
    //       console.warn(resp)
    //     //   getUsers()
    //     })
    //   })
    // }


return(
        <form >
            <div className={classes.lable}>
                <label >Employee ID</label>
                <input type="number" name="employee_id" 
                    onChange={changeidHandler}
                    value={enteredid} 
                    placeholder="Employee ID"/>
            </div>

            <div className={classes.lable}>
                <label className={classes.lbb}>Role</label>
                   <input type="number" name="roleId" 
                    onChange={changeroleHandler}
                    value={enteredrole} 
                    placeholder="Role:1/2/3"/>
            </div>

            <Button
                type="submit" onSubmit ={submitHandler} 
                className="btn btn-primary">Submit
            </Button>
        </form>
    )
}

export default AddUser;




