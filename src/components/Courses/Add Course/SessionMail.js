import Axios from 'axios';
import { useState } from 'react';
import classes from './SessionMail.module.css';
import Button from '../../UI/Button/Button';
import { message } from 'antd';

const SessionMail = (props) => {
    let token = `Bearer ${sessionStorage.getItem('jwt')}`;
    const url = "http://localhost:8080/api/scheduleEmail";

    const name = props.name;
    const trainer = "Sri."+props.trainerName;
    const desc = props.sessionDescription;
    const start = props.sessionStartTime;
    const end = props.sessionEndTime;

    ///////date format correction////////
    const [year, month, day] = props.sessionDate.split("-");
    const eventDate = [day, month, year].join('/');

    const [data,setData] = useState({
            emailId:"",
            emailSubject:`Notification for Offline/OBT session`,
            emailBody:`Hi everyone,\nThis mail is to notify that a session on ${name}
                 has been scheduled for all of you.\nThe session, ${desc}, is arranged on ${eventDate}
                  from ${start}hrs and will continue till ${end}hrs.\nThe session will be handled by 
                  ${trainer}.\nThanks and Regards,\nTeam LMS\nExperion Learning`,
            scheduleDate:"",
            emailTimeZone:"Asia/Kolkata",
          });

function handle(e){
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
}


function submit(e){
    e.preventDefault();
    Axios.post(url,{
    email:data.emailId,
    subject:data.emailSubject,
    body:data.emailBody,
    dateTime:data.scheduleDate,
    timeZone:data.emailTimeZone,
},
{headers:{
    'Authorization':token
  }})



.then(res=>{
    if(res.data != null){
    message.success("Email scheduled Successfully!")
    }
    console.log(res.data)
})



}
    return (
        <div className={classes.session}>
            <h4>Schedule Notification</h4>
            <form onSubmit={(e)=>submit(e)}>
                <div className={classes.individual}>
                    <label>Email</label>
                    <input type="email"
                        id='emailId'
                        placeholder="Email"
                        onChange={(e)=>handle(e)}
                        value={data.emailId} />
                </div>

                <div className={classes.individual}>
                    <label>Date</label>
                    <input type="datetime-local"
                        id='scheduleDate'
                        onChange={(e)=>handle(e)}
                        value={data.scheduleDate} />
                </div>

                <Button type="submit">Schedule Mail</Button>
            </form>               

        </div>
        )}

export default SessionMail;