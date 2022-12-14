import React from 'react';
import { Container,Row,Col,Form ,Button, Modal} from 'react-bootstrap';
// import {connect} from 'react-redux';
import classes from './UserProfile.module.css';
import DefaultUserPic from "../images/team-male.jpg";
import { useState } from 'react';
import ChangePassword from './ChangePassword';

// import boote from'bootstrap/dist/css/bootstrap.css';
// import {Container,Row,Col,Form ,Button } from 'reactstrap';
// const axios = require('axios');

const UserProfile=(props)=> {
    const [changePwd, setChangePwd] = useState(false);

   
    const changePasswordForm=()=>{
        setChangePwd(true)
    }


    return (
            <div className={classes.profile}>
                <div className={classes.profileImg}>
                    <img src={DefaultUserPic} alt="profils pic" />
                    <h1>{props.name}</h1>
                    <input type="file" name="profileImage" />
                    <Button variant="primary"><b>Update Image</b></Button>
                </div>
                <div className={classes.data}>
                    <b>Employee Id :</b> {props.employeeId}<br></br>
                    <b>Username :</b> {props.name}@experionglobal.com<br></br>
                    {/* <b>Password :</b> **********   */}
                    <Button onClick={changePasswordForm} className={classes.changePassword}><b>Change Your Password</b></Button><br></br>
                    {changePwd && <ChangePassword employeeId={props.employeeId}/> }
                </div>
            </div>
    );

}


export default UserProfile;