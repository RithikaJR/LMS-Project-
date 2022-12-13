import React, {useState}  from 'react'; 
import axios from 'axios';
import classes from './AddUser.module.css';
import Button from '../UI/Button/Button';

const AddUser =()=> {

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
      let res = await fetch('http://localhost:8080/api/userupdate', {
        method: "PUT",
       
    }
       

      )
    }
    catch (err) {
        console.log(err);
      }
  };



    return(
        <form >
            <div className={classes.lable}>
                <label >Employee ID</label>
                <input type="text" name="employee_id" 
                    onChange={changeidHandler}
                    value={enteredid} 
                    placeholder="Employee ID"/>
            </div>

            <div className={classes.lable}>
                <label className={classes.lbb}>Role</label>
                {/* <select type="text" name="role" 
                    onChange={this.changeHandler} 
                    value={role} 
                    placeholder="Choose Role">
                        <option value="Learning Admin">Learning Admin</option>
                        
                    </select> */}

                   <input type="text" name="role" 
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



