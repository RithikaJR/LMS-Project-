import Axios from 'axios';
import Button from '../UI/Button/Button';
import classes from "./UserPage.module.css";

import image from '../images/excel.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';



const UserPage = () => {
   
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;
    
    const [selectedFile,setState] = useState(null);
    const [addEmployee, setAddEmployee] = useState(false);
    const [addList, setAddList] = useState(false);
    const [data,setData] = useState({
        id:"",
        firstName:"",
        lastName:"",
        email:""      
      })

      const [employeeIdErrorMessage, setemployeeIdErrorMessage] = useState('')
      const [employeeEmailErrorMessage, setemployeeEmailErrorMessage] = useState('')

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      const [formIsValid, setFormIsValid] = useState(false);

      useEffect(() =>{
        const identifier =setTimeout(() =>{
          console.log("Validity Check");
          
          if(data.id !=='' && /[0-9]/.test(data.id)){
            setemployeeIdErrorMessage('')
          }
          if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email) === true){
            setemployeeEmailErrorMessage('');
            setFormIsValid(true)
        }
            
        }, 500)
  
        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
          };
        }, [data.id,data.email]) 

    const url = "http://localhost:8080/api/employee";

    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    
    function submit(e){
        e.preventDefault();
        Axios.post(url,{
          employeeId:data.id,
          employeeFirstName:data.firstName,
          employeeLastName:data.lastName,
          employeeEmail:data.email      
        },
        {headers:{
            'Authorization':token
          }})
      
        .then(res=>{
          if(res.data != null){
            message.success("Employee added successfully!!")
            setData({
                        id:"",
                        firstName:"",
                        lastName:"",
                        email:""      
                    })

          }else{
            message.error("Somthing wnet wrong!!")
          }
          console.log(res.data);
        })
      
      }


    
    const onFileChange = event => {
   
        setState(event.target.files[0]);
    };

   
    const onFileUpload = (e) => {
        e.preventDefault();
        setState(e.target.files);

        const formData = new FormData();
        formData.append('file',selectedFile);
        fetch('http://localhost:8080/api/employee/upload', 
        {method: 'post',body: formData,headers:{
            'Authorization':token
          }})
        .then(res => {
            if (res.ok) {
                console.log(res.data);
                message.success("File uploaded successfully.")
            }else{
                message.error("Somthing went wrong")
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
        } 
    };

    const employeeHandler = () => {
        setAddList(true);
        setAddEmployee(false);
    };

    const listHandler = () => {
        setAddList(false);
        setAddEmployee(true);
    };

    const validateEmployyeId = () =>{
        if(!/[0-9]/.test(data.id)){
            setemployeeIdErrorMessage("Please only enter numeric characters (Allowed input:0-9)")
            setFormIsValid(false)
        }

    }
    const validateEmployyeEmail = ()=>{
        if(emailRegex.test(data.email) !== true){
            setemployeeEmailErrorMessage("Please enter valid email address")

            setFormIsValid(false)
        }

    }

    const submitHandler = () => {

    }
        return (
            <div className={classes.userpage}>
                <div className={classes.options}>
                    <Button onClick={employeeHandler}>Add Employee List</Button>
                    <Button onClick={listHandler}>Add a new Employee</Button>
                </div>

                {addList && 
                <div className={classes.employeelist}>
                     <h2>
                         Upload Employee Details
                     </h2>
                     <div className={classes.sample}>

                        <h4>Dowload Template here : </h4>

                        <a href='https://experiontechnologies-my.sharepoint.com/personal/vaishnav_cc_experionglobal_com/_layouts/15/download.aspx?e=Zqt516&share=EbR-k5dxQZdKuJmypTMuHPsBGrcXfz0DnX0nqVdAk76k3Q'>

                            <img src={image} />

                        </a>

                    </div>
                     <div>
                         <input type="file" 
                         accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                         onChange={onFileChange} required />
                         <Button onClick={onFileUpload}>
                             Upload
                         </Button>
                     </div>
                     {fileData()}
                </div>
                }

                 {addEmployee &&

                    <div className={classes.addemployee}>
                        <h3>Add Employee</h3>
                        <form onSubmit={(e)=>submit(e)}>
                            <div className={classes.individual}>
                                <label>Employee ID</label>
                                <input type="number"
                                       id="id"
                                       min="0"
                                       placeholder='Employee ID'
                                       onChange={(e)=>handle(e)}
                                       value={data.id}
                                       onBlur={validateEmployyeId}
                                       required />
                                       {employeeIdErrorMessage === '' ? null :
                                    <div className={classes.errorMessage}>{employeeIdErrorMessage}</div>}
                            </div>
                            <div className={classes.individual}>
                                <label>First Name</label>
                                <input type="text"
                                       id="firstName"
                                       placeholder='Firstname'
                                       onChange={(e)=>handle(e)}
                                       value={data.firstName}
                                       required />
                            </div>
                            <div className={classes.individual}>
                                <label>Last Name</label>
                                <input type="text"
                                       id="lastName"
                                       placeholder='Lastname'
                                       onChange={(e)=>handle(e)}
                                       value={data.lastName}
                                       required />
                            </div>
                            <div className={classes.individual}>
                                <label>Employee Email</label>
                                <input type="email"
                                       id="email"
                                       placeholder='Email'
                                       onChange={(e)=>handle(e)}
                                       value={data.email}
                                       onBlur={validateEmployyeEmail}
                                       required />
                                       {employeeEmailErrorMessage === '' ? null :
                                    <div className={classes.errorMessage}>{employeeEmailErrorMessage}</div>}
                            </div>
                            <Button type="submit"   disabled={!formIsValid}>Submit </Button>
                        </form> 
                    </div> 
                }
                 
             </div>
        );
    }


export default UserPage;
