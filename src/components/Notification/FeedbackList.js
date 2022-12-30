import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import classes from "./FeedbackList.module.css";


const FeedbackList = (props) => {

    let token = `Bearer ${sessionStorage.getItem('jwt')}`;

    const [feebacks, setFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();
  
      useEffect(() => {
          const fetchFeedbacks = async () => {
            let response;
            
              response = await fetch(
                'http://localhost:8080/api/feedback-form'
                ,{
                  headers:{
                    'Authorization':token
                  }
                });
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
      
            const responseData = await response.json();
      
            const employeeFeedback = [];
            const feedbackArray = {...responseData._embedded.feedback};
      
            for (const key in feedbackArray) {
              employeeFeedback.push({
                id: key,
                feedbackId: feedbackArray[key].feedbackId,
                employeeId: feedbackArray[key].employeeId,
                employeeName: feedbackArray[key].employeeName,
                feedback: feedbackArray[key].feedback,
                status: feedbackArray[key].status,
              });
            }
            // console.log("dfsdf")
            setFeedback(employeeFeedback);
            console.log(feebacks);
            setIsLoading(false);
          };
      
          fetchFeedbacks().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
          });
  
        }, []);

        const feedbackList = feebacks.map((feedBack) => (
            <FeedbackItem
              key={feedBack.id}
              id={feedBack.feedbackId}
              employeeName={feedBack.employeeName}
              feedback={feedBack.feedback}
              status={feedBack.status}
            />
          ));

    return(
        <div className={classes.feedbackList}>
            <h1 className={classes.h1}>FeedBacks</h1>
            <ol>{feedbackList}</ol>
        </div>
    )
}

export default FeedbackList;