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

    // React.Component
    // constructor(props){
    //     super(props);
    //     this.state={
    //         user_id:this.props.user_id,
    //         username:this.props.username,
    //         email:this.props.email,
    //         profileImage:this.props.profileImage,
    //         msg:this.props.msg,
    //         uploadedFile:null
    //     }
    // }

    // fetchUserDetails=(user_id)=>{
    //     //console.log(user_id);
    //     axios.get("http://localhost:5000/userapi/getUserDetails/"+user_id,{
    //         headers: {
    //             "content-type": "application/json"
    //           }
    //     }).then(res=>{
    //         console.log(res);
    //         this.setState({email:res.data.results[0].email});
    //         this.setState({profileImage:res.data.results[0].profileImage})
    //     })
    //     .catch(err=>console.log(err))
    // }

    // changeProfileImage=(event)=>{
       
    //     this.setState({uploadedFile:event.target.files[0]});
    // }

    // UpdateProfileHandler=(e)=>{
    //     e.preventDefault();
    //     //create object of form data
    //     const formData=new FormData();
    //     formData.append("profileImage",this.state.uploadedFile);
    //     formData.append("user_id",this.state.user_id);

    //     //update-profile
    //     axios.post("http://localhost:5000/userapi/update-profile/",formData,{
    //         headers: {
    //             "content-type": "application/json"
    //           }
    //     }).then(res=>{
    //         console.log(res);
    //        this.setState({msg:res.data.message});
    //        this.setState({profileImage:res.data.results.profileImage});
    //     })
    //     .catch(err=>console.log(err))
    // }


    // componentDidMount(){
    //  this.fetchUserDetails(this.state.user_id);
    // }
    const changePasswordForm=()=>{
        setChangePwd(true)
    }
 
// render(
    // if(this.state.profileImage){
    //     var imagestr=this.state.profileImage;
    //     imagestr = imagestr.replace("public/", "");
    //     var profilePic="http://localhost:5000/"+imagestr;
    // }else{
    //      profilePic=DefaultUserPic;
    // }

    return (
            <div className={classes.profile}>
                <div className={classes.profileImg}>
                    <img src={DefaultUserPic} alt="profils pic" />
                    <h1>{props.name}</h1>
                    <input type="file" name="profileImage" />
                    {/* onChange={this.changeProfileImage} */}
                    <Button variant="primary"><b>Update Image</b></Button>
                    {/* onClick={this.UpdateProfileHandler} */}
                </div>
                <div className={classes.data}>
                    <b>Employee Id :</b> {props.employeeId}<br></br>
                    <b>Username :</b> {props.name}@experionglobal.com<br></br>
                    {/* <b>Password :</b> **********   */}
                    <Button onClick={changePasswordForm} className={classes.changePassword}><b>Change Your Password</b></Button><br></br>
                    {changePwd && <ChangePassword employeeId={props.employeeId}/> }
                    {/* employeeId={props.employeeId} */}
                </div>
            </div>
    );

}


export default UserProfile;