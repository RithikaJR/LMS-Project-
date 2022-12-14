import React, { useEffect, useState } from 'react';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import exp_logo_dark from '../images/exp_logo_dark.png';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  
  useEffect(() =>{
    const identifier =setTimeout(() =>{
      console.log("Validity Check");
      setFormIsValid(
          enteredEmail.includes('@') && enteredPassword.trim().length > 6
        
      );
    }, 500)

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail,enteredPassword]) 
 
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@experionglobal.com'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
   
    <div className={classes.loginPage}>
      <div className={classes.login_left}>
          <div className={classes.headerimage}>
              <a href=''><img src={exp_logo_dark}/></a>
          </div>
      </div>
      <div className={classes.login}>
        <h2 className='login-text'>Login</h2>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ''
            }`}
          >
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="email"
              placeholder='Username..'
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              passwordIsValid === false ? classes.invalid : ''
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Password..'
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid} onClick={submitHandler}>
              Login
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;