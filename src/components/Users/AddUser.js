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
            <label >Employee ID</label>
            <input type="text" name="employee_id" 
                onChange={this.changeHandler}
                value={employee_id} />

            <label>Role</label>
            <input type="text" name="role" 
                onChange={this.changeHandler} 
                value={role} />

{/* <select    value={'ItemType'}  onChange={this.handleChange}  style={{'width':'200px'}}>
                     <option value='0'>Select An Item Type</option>
                     <option value='1'>**Learning Admin**</option>
                    
                    </select> */}

        

            <Button
                type="submit"
                className="btn btn-primary">submit
            </Button>
        </form>
    )
}
}
export default AddUser;