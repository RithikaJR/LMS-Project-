import React, { useState } from "react";
import Button from "../UI/Button/Button.js";
import classes from './Feedbackform.module.css';

// const FORM_ENDPOINT = ""; // TODO - fill on the later step

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div>Thank you!</div>
        <div>We'll be in touch soon.</div>
      </>
    );
  }

  return (

    <div className={classes.loginPage}>
   
    <form
      // action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
    >
        {/* <h2>Feedback</h2> */}

<div className={classes.login}>
        <h2>Feedback</h2>
      <div className={classes.control}>
        <input
          type="text"
          placeholder="Your name"
          name="name"
         
          required
        />
      </div>
      <div className={classes.control}>
        <input
          type="email"
          placeholder="Email"
          name="email"
         
          required
        />
      </div>
      <div className={classes.controll}>
        <textarea
          placeholder="Your message"
          name="message"
         
          required
        />
      </div>
      <div className="classes.control">
        <Button
         
          type="submit"
        >
          Send a message
        </Button>
       
      </div>
      </div>
    </form>
    </div>
  );
};

export default FeedbackForm;