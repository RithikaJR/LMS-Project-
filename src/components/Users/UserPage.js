// import axios from 'axios';
// import React,{Component} from 'react';
import Button from '../UI/Button/Button';
import classes from "./UserPage.module.css";
// import Search from "../Search Bar/Search.js";
import image from '../images/excel.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import constants from './constants';


const UserPage = () => {
   
    const [selectedFile,setState] = useState(null);

    // On file select (from the pop up)
    const onFileChange = event => {
    // Update the state
        setState(event.target.files[0]);
    };

   
    const onFileUpload = (e) => {
        e.preventDefault();
        setState(e.target.files);

        const formData = new FormData();
        formData.append('file',selectedFile);
        fetch('http://localhost:8080/api/employee/upload', {method: 'post',body: formData})
        .then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
    };

   
    const fileData = () => {
        if (selectedFile) {
            

                return (
                                     <div className={classes.inside_userpage}>
                                         <div>
                                             <h2>File Details:</h2>
                                             <p>File Name: {selectedFile.name}</p>
                    
                                             <p>File Type: {selectedFile.type}</p>
                    
                                             <p>
                                                 Last Modified:{" "}
                                                 {selectedFile.lastModifiedDate.toDateString()}
                                             </p>
                    
                                         </div>
                                     </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h6>Choose before Pressing the Upload button</h6>
                </div>
            );
        }
    };
   
        return (
            

            <div className={classes.userpage}>
                 <div>
                     <h1>
                         Add User List
                     </h1>
                     <h3>
                         Upload Employee Details
                     </h3>
                     <div className={classes.sample}>

                        <h4>Dowload Template here : </h4>

                        <a href='https://experiontechnologies-my.sharepoint.com/personal/vaishnav_cc_experionglobal_com/_layouts/15/download.aspx?e=Zqt516&share=EbR-k5dxQZdKuJmypTMuHPsBGrcXfz0DnX0nqVdAk76k3Q'>

                            <img src={image} />

                        </a>

                    </div>
                     <div>
                         <input type="file" onChange={onFileChange} />
                         <Button onClick={onFileUpload}>
                             Upload
                         </Button>
                     </div>
                     {fileData()}
                 </div>
             </div>
        );
    }


export default UserPage;
