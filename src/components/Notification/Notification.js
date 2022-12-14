import classes from '../Notification/Notification.module.css';
import React from 'react';


const Notification = (props)=>{
    return(
        <div className={classes.not}>
            <p>Notification</p>
            
            
            

        <table>
            <tr>
            <th>Name</th>
            <th>Course Name</th>
            <th>Approval Status</th>
            </tr>
            <tr>
            <td>Drishya</td>
            <td>HTML Basics</td>
            <td>
                <button>Approve</button>
                <button>Reject</button>
            </td>
            </tr>
            <tr>
            <td>Anupriya</td>
            <td>Communication skill</td>
            <td>
            <button>Approve</button>
                <button>Reject</button>
            </td>
            </tr>
            <tr>
            <td>Megha</td>
            <td>Core Java</td>
            <td>
            <button>Approve</button>
                <button>Reject</button>
            </td>
            </tr>
       </table>

       
       </div>
        
    );
};



// const Form = ({submitting, handleSubmit, formData, setFormData}) => {
//     return <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         required
//         value={formData.text} 
//         onChange={(e) => setFormData({text: e.target.value})}
//       />
//       <br />
//       <button type="submit">{submitting ? 'Sending...' : 'Save'}</button>
//     </form>
//   }
  
//   const Revision = ({formData}) => {
//     return <div>
//       <p>Your sucess message...</p>
//       <p>{formData.text }</p>
//       <button>Approve</button>
//       <button>Reject</button>
//     </div>
//   }
  
//   const Notification = () => {
//     const [submitting, setSubmitting] = React.useState(false)
//     const [submitted, setSubmitted] = React.useState(false)
//     const [formData, setFormData] = React.useState({text: ''})
    
//     const handleSubmit = (e) => {
//       e.preventDefault()
//       setSubmitting(true)
//       // Fake send post data
//       setTimeout(() => {
//         setSubmitted(true)
//       }, 1000)
//     }
    
//     const handleApprove = () => {
//       // Send PUT request to update your post.
//     }
    
//     const handleReject = () => {
//       // Send PUT request to update your post.
//     }
    
//     if (submitted) {
//       return <Revision
//         formData={formData}
//         handleApprove={handleApprove}
//         handleReject={handleReject}
//       />
//     } else {
//       return <Form 
//         submitting={submitting}
//         handleSubmit={handleSubmit} 
//         formData={formData}
//         setFormData={setFormData}
//       />
//     }
//   }
  export default Notification;