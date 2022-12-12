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
        <Navbar bg="light" expand="lg">
        {/* <Collapsible trigger={<image src={DefaultUserPic}/>}>
            <ul>
              <li>
                Change Password
              </li>
            </ul>
        </Collapsible> */}
  {/* <Navbar.Brand href="#home">Password Management System</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
  {/* <Navbar.Collapse id="basic-navbar-nav"> */}
    {/* <Nav className="mr-auto"> */}
      {/* <Link to="/" className="nav-link">Home</Link> */}
      {/* <Link to="/" className="nav-link">Password Category</Link>
    
      <NavDropdown title="Passowrd" id="basic-nav-dropdown">
        <Link to="#" className="dropdown-item" role="button">Add New Password</Link>
        <Link to="#" className="dropdown-item" role="button">View All Passwrd</Link>
      </NavDropdown> */}

      {/* <NavDropdown title={props.userDetails.username} id="basic-nav-dropdown">
      <Link to="/userprofile" className="dropdown-item" role="button">View Profile</Link>
      <Link to="#" onClick={()=>props.logoutUser()} className="dropdown-item" role="button">Logout</Link>
      </NavDropdown> */}
        
    {/* </Nav>  */}
    
  {/* </Navbar.Collapse> */}
</Navbar>
    <div>
        <Button onClick={showCartHandler}>Change Password</Button>
        {cartIsShown && <Modal onClose={cartIsShown}>
        <UserProfile name={props.name} employeeId={props.employeeId} />
        <Button onClick={hideCartHandler}>Close</Button>
        {/* name={props.name} employeeId={props.employeeId} */}
        </Modal>}
    </div>
        </div>

    )

}
export default LAHomePage;