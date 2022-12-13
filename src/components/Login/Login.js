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

  const [roleId, setRoleId] = useState()
  const [roleName, setRoleName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [category, setCategory] = useState([]);


  
  useEffect(() =>{
    const identifier =setTimeout(() =>{
      console.log("Validity Check");
      setFormIsValid(
          enteredEmail.includes('.') && enteredPassword.trim().length > 6
        
      );
    }, 500)

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail,enteredPassword])

  

 

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('.'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
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
          {/* <div className={classes.drop}>
            <label className={classes.lbb}>Login as: </label>
            <select type="text" name="roleName" 
                onChange={handleRole}
                value={roleId}
                placeholder="Choose Role">
                  {category.map(category => (
                    <option value={category.roleId} name={category.roleId} onChange={handleRole}>{category.role_name}</option>))}
            </select>
          </div> */}

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
              // className={classes.useremail}
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
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
              // className={classes.userpassword}
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;