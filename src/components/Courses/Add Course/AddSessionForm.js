import { useState } from 'react';
import Axios from 'axios';
import Button from '../../UI/Button/Button';
import classes from './AddSessionForm.module.css';
import SessionMail from './SessionMail';


const AddSessionForm = (props) => {

        let token = `Bearer ${sessionStorage.getItem('jwt')}`;

        const [cartIsShown, setCartIsShown] = useState(false);

        const showCartHandler = () => {
                setCartIsShown(true);
              };

        const url = "http://localhost:8080/api/sessions"

        const [data,setData] = useState({
                sessionName:"",
                sessionId:"",
                trainer:"",
                sessionDescription:"",
                date:"",
                startTime:"",
                endTime:"",
                cost:""
              });

function handle(e){
  const newdata = {...data}
  newdata[e.target.id] = e.target.value
  setData(newdata)
  console.log(newdata)
}

 let start = (data.startTime).toString("HH:mm:ss");
 let end = (data.endTime).toString("HH:mm:ss");

function submit(e){
  e.preventDefault();
  Axios.post(url,{
    sessionName:data.sessionName,
    trainerName:data.trainer,
    sessionDescription:data.sessionDescription,
    sessionDate:data.date,
    sessionStartTime:start,
    sessionEndTime:end,
    sessionCost:data.cost
  },
  {headers:{
      'Authorization':token
    }})

 

  .then(res=>{
    if(res.data != null){
      alert("Session added Successfully!")
    }
    console.log(res.data)
  })


  console.log(data.endTime);
  console.log(data.startTime);
  console.log(end);
  console.log(start);

}



    return (
        <div className={classes.session}>
            <h2>Offline/OBT Session</h2>
            <form onSubmit={(e)=>submit(e)}>
                <div className={classes.individual}>
                    <label>Session Name</label>
                    <input type="text"
                        id='sessionName'
                        placeholder="Session Name"
                        onChange={(e)=>handle(e)}
                        value={data.sessionName}
                        required />
                </div>
                
                <div className={classes.individual}>
                <label>Trainer</label>
                <input type="text"
                        placeholder="Trainer Name"
                        id='trainer'
                        onChange={(e)=>handle(e)}
                        value={data.trainer}
                        required  />
                </div>

                <div className={classes.individual}>
                <label>Session Description</label>
                <textarea type="textarea"
                        placeholder="Session Description"
                        rows="4"
                        cols="35" 
                        id='sessionDescription'
                        onChange={(e)=>handle(e)}
                        value={data.sessionDescription}
                        required />
                </div>

                <div className={classes.date}>
                <label>Date</label>
                <input type="date"
                        id='date'
                        onChange={(e)=>handle(e)}
                        value={data.date}
                        required 
                        />
                </div>

                <div className={classes.both}>
                <label>Start Time</label>
                <input type="time"
                       id='startTime'
                       onChange={(e)=>handle(e)}
                       value={data.startTime} 
                       step="2"
                       required 
                        />

                <label>End Time</label>
                <input type="time"
                        id='endTime'
                        onChange={(e)=>handle(e)}
                        value={data.endTime}
                        step="2"
                        required 
                        />
                </div>
                
                <div className={classes.individual1}>
                <label>Trainer Compensation</label>
                <span>₹</span>
                <input type="number"
                        placeholder="Amount"
                        min="0"
                        step="500"
                        id='cost'
                        onChange={(e)=>handle(e)}
                        value={data.cost} />
                </div>

                <Button type="submit" onClick={showCartHandler}>Submit</Button>
            </form>

             {cartIsShown && <SessionMail
                                name={data.sessionName}
                                trainerName={data.trainer}
                                sessionDescription={data.sessionDescription}
                                sessionDate={data.date}
                                sessionStartTime={start}
                                sessionEndTime={end} /> }
                

        </div>

    )
}

export default AddSessionForm;