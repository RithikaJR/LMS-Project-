import React from 'react';
import { Container,Row,Col,Form ,Button, Modal} from 'react-bootstrap';
// import {connect} from 'react-redux';
import classes from './UserProfile.module.css';
import DefaultUserPic from "../images/team-male.jpg";
import { useState } from 'react';
import ChangePassword from './ChangePassword';
import axios from 'axios';

// import boote from'bootstrap/dist/css/bootstrap.css';
// import {Container,Row,Col,Form ,Button } from 'reactstrap';
// const axios = require('axios');

const UserProfile=(props)=> {
    const [changePwd, setChangePwd] = useState(false);
    const [state, setState] = useState({employeeId: '',
                                        username:'',
                                        profileImage:'',
                                        msg:'',
                                        uploadedFile:''});

    const changeProfileImage=(event)=>{
       
        setState({uploadedFile:event.target.files[0]});
    }

    const UpdateProfileHandler=(e)=>{
        e.preventDefault();

        //create object of form data
        const formData=new FormData();
        formData.append("profileImage",state.uploadedFile);
        formData.append("user_id",state.employeeId);

        //update-profile
        axios.post("http://localhost:5000/userapi/update-profile/",formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
           this.setState({msg:res.data.message});
           this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))
    }
    const changePasswordForm=()=>{
        setChangePwd(true)
    }


    return (
            <div className={classes.profile}>
                <div className={classes.profileImg}>
                    <img src={DefaultUserPic} alt="profils pic" />
                    <h1>{props.name}</h1>
                    <input type="file" name="profileImage"  onChange={changeProfileImage}/>
                    <Button variant="primary" onClick={UpdateProfileHandler} ><b>Update Image</b></Button>
                </div>
                <div className={classes.data}>
                    <b>Employee Id :</b> {props.employeeId}<br></br>
                    <b>Username :</b> {props.name}@experionglobal.com<br></br>
                    <Button onClick={changePasswordForm} className={classes.changePassword}><b>Change Your Password</b></Button><br></br>
                    {changePwd && <ChangePassword employeeId={props.employeeId} userId={props.userId}/> }
                </div>
            </div>
    );

}


export default UserProfile;