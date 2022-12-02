import UserPage from "./UserPage";
import classes from "./UserMainPage.module.css";
import ViewList from "./ViewList";
import styled from 'styled-components';
import AddUser from "./AddUser";
import { useState } from "react";


const Tab = styled.button`
  margin: 30px;
  height: 5rem;
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  ${({ active }) =>
    // active &&
    `
    font-family: 'Montserrat', sans-serif;
    opacity: 1;
    color: #1a72be;
  `}
  ${({ active }) =>
    active &&
    `
    font-family: 'Montserrat', sans-serif;
    opacity: 1;
    background-color: #6898c3;
    color: white;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const types = ['All Users', 'Assign Role', 'Excel Upload'];

const UserMainPage = () => {

  const [active, setActive] = useState(types[0]);

  return (
    <div className={classes.wrap}>
    <div className={classes.tab}>

      <ButtonGroup>

        {types.map(type => (

          <Tab className={classes.tab_wrap}

            key={type}

            active={active === type} 

            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}

      </ButtonGroup>
          <div className={classes.all_tab}>
            {active==='All Users' && <ViewList />}

            {active === "Assign Role" && <AddUser/>}

            {active==='Excel Upload' && <UserPage />}
          </div>



    </div>
    </div>

  );

}

// // Usage

// <TabGroup/>

export default UserMainPage;