import axios from 'axios';
import React,{Component} from 'react';
import Button from '../UI/Button/Button';
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
    onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
    "myFile",
    this.state.selectedFile,
    this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);
    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
    };

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