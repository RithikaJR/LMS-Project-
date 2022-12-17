import React, {Component, useState}  from 'react'; 
import axios from 'axios';
import classes from './AddUser.module.css';
import Button from '../UI/Button/Button';
// import classes from "./UserPage.module.css";

const AddUser =()=> {

    let token = `Bearer ${sessionStorage.getItem('jwt')}`;
    const [enterempid, setenterempdid] = useState();
    const [enteredrole, setenteredrole] = useState(2);
   
const changeidHandler= (e) => {
    console.log(e.target.value);
    setenterempdid(e.target.value);
}  

const changeroleHandler= (e) => {
    console.log(e.target.value);
    setenteredrole(e.target.value);
}  

let submitHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:8080/api/userupdate/'+enterempid, {
        method: "PUT",
        body: JSON.stringify({
            roleId:enteredrole
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            // 'Authorization':token
          }}
      ).then(response => {
        if (!response.ok) {
            throw new Error('Something went wrong!');
          }else{
            alert("Role Changed Successfully")
          }
      })
    }
    catch (err) {
        console.log(err);
      }
  };

    return(
        <form onSubmit={submitHandler} className={classes.wrap}>
             <div className={classes.lable}>
                <label >Employee ID</label>
                <input type="text" name="employee_id" 
                    onChange={changeidHandler}
                    value={enterempid} 
                    placeholder="Employee ID"/>
            </div>

            <div className={classes.lable}>
            <label className={classes.lbb}>Role</label>
            <select type="text" name="role" 
                onChange={changeroleHandler} 
                placeholder="Choose Role">
                    <option value={enteredrole}>Choose Role</option>
                    <option value={enteredrole}>Learning Admin</option>
                </select>
            </div>

            <Button
                type="submit" onSubmit ={submitHandler} 
                className="btn btn-primary">Submit
            </Button>
        </form>
    )
}
export default AddUser;
