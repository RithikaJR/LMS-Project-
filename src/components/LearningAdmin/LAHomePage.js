import { useEffect, useState } from 'react';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';
import UserProfile from '../Employee/UserProfile';
import DefaultUserPic from "../images/team-male.jpg";
import './LAHome.css'
import Modal from "../UI/Modal/Modal.js";
import Button from '../UI/Button/Button';
// import { Button } from 'bootstrap';
const LAHomePage =(props)=>{
  const [cartIsShown, setCartIsShown] = useState(false);
  useEffect(() => {
    // const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if(props.tracker===1){
      setCartIsShown(true);
    }else{
      setCartIsShown(false);
    }
   
  },[]);


    const showCartHandler = () => {
      setCartIsShown(true);
    };
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    };

    return(
        <div>

        <h1>
            Hello lEARNING learaningAdmin
        </h1>
    <div>
        <Button onClick={showCartHandler}>Change Password</Button>
        {cartIsShown && <Modal onClose={cartIsShown}>
        <UserProfile name={props.name} employeeId={props.employeeId} />
        <Button onClick={hideCartHandler}>Close</Button>
        </Modal>}
    </div>

    <div>
      
    </div>
        </div>

    )

}
export default LAHomePage;