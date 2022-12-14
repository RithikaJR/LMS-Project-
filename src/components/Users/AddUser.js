import React, {Component}  from 'react'; 
import axios from 'axios';
import classes from './AddUser.module.css';
import Button from '../UI/Button/Button';

class AddUser extends Component{
    constructor() {
        super();
    this.state = {
        employee_id: '',
        role: ''
        
    };
}
changeHandler= (e) => {
    this.setState({ [e.target.name]: e.target.value})
}   

submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios.post('https://reqres.in/api/users?per_page=20', this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}

render() {
    const {employee_id, role} = this.state;
    return(
        <form onSubmit ={this.submitHandler} className={classes.wrap}>
            <div className={classes.lable}>
            <label >Employee ID</label>
            <input type="text" name="employee_id" 
                onChange={this.changeHandler}
                value={employee_id} 
                placeholder="Employee ID"
                required />
            </div>

            <div className={classes.lable}>
            <label className={classes.lbb}>Role</label>
            <select type="text" name="role" 
                onChange={this.changeHandler} 
                value={role} 
                placeholder="Choose Role"
                required>
                    <option value="Learning Admin">Learning Admin</option>
                    
                </select>
            </div>

            <Button
                type="submit"
                className="btn btn-primary">Submit
            </Button>
        </form>
    )
}
}
export default AddUser;