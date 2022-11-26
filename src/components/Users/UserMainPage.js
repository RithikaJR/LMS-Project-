import UserPage from "./UserPage";
import classes from "./UserMainPage.module.css";
import ViewList from "./ViewList";
import styled from 'styled-components';
import AddUser from "./AddUser";
import { useState } from "react";


const Tab = styled.button`
  margin: 30px;
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const types = ['All Users', 'Add New Users', 'Excel Upload'];

const UserMainPage = () => {

  const [active, setActive] = useState(types[0]);

  return (

    <div className={classes.tab}>

      <ButtonGroup>

        {types.map(type => (

          <Tab

            key={type}

            active={active === type}

            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}

      </ButtonGroup>

      {active==='All Users' && <ViewList />}

      {active === "Add New Users" && <AddUser/>}

      {active==='Excel Upload' && <UserPage />}
    </div>

  );

}

// // Usage

// <TabGroup/>

export default UserMainPage;
// const UserMainPage = () => {
//     return (
//         <div className={classes.mainpage}>
            
            
//              <h1>This is user main page</h1>
//             {/* <UserPage /> */}
//             <ViewList />
//         </div>
       
//     );
// }



// export default UserMainPage;