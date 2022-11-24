import axios from 'axios';
import React,{Component} from 'react';
import Button from '../UI/Button/Button';
import AddUser from './AddUser';
import classes from "./UserPage.module.css";

class UserPage extends Component {

    state = {
    // Initially, no file is selected
    selectedFile: null
    };

    // On file select (from the pop up)
        onFileChange = event => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

    };
    // On file upload (click the upload button)


    onFileUpload = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files
        });
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        fetch('http://localhost:8080/api/employee/upload', {
            method: 'post',
            body: formData
        }).then(res => {
            if(res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
    };
    // onFileUpload = () => {

    // // Create an object of formData
    // let formData = new FormData();

    // // Update the formData object
    // formData.append(
    // "file",
    // this.state.selectedFile,
    // this.state.selectedFile.name
    // );

    // // Details of the uploaded file
    // // console.log(this.state.selectedFile);
    
    // // Request made to the backend api
    // // Send formData object
    // const response = axios.post("http://localhost:8080/api/employee/upload",formData);
    // console.log(response);
    // };

    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {

    if (this.state.selectedFile) {
            return (
                <div className={classes.inside_userpage}>
                    <div>
                        <h2>File Details:</h2>
                        <p>File Name: {this.state.selectedFile.name}</p>

                        <p>File Type: {this.state.selectedFile.type}</p>

                        <p>
                            Last Modified:{" "}
                            {this.state.selectedFile.lastModifiedDate.toDateString()}
                        </p>

                     </div>
                </div>
            
            );
    } else {

            return (
                <div className={classes.inside_userpage}>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div className={classes.userpage}>
                
                <div>
                    <AddUser/>
                </div>
                <div>
                    <h1>
                        Add Users
                    </h1>
                    <h3>
                        Upload Employee Details
                    </h3>
                    <div>
                        <input type="file" onChange={this.onFileChange} />
                        <Button onClick={this.onFileUpload}>
                            Upload
                        </Button>
                    </div>
                    {this.fileData()}
                </div>
            </div>

            
        );
    }
}

export default UserPage;