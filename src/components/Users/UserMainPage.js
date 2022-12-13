import UserPage from "./UserPage";
import classes from "./UserMainPage.module.css";
import ViewList from "./ViewList";
import AddUser from "./AddUser";
import { useState } from "react";
import { ButtonGroup, Tab} from "./ComponentStyles";


const types = ['All Users', 'Assign Role', 'Add Employee'];

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

            {active==='Add Employee' && <UserPage />}
          </div>

    </div>
    </div>

  );

}

// // Usage

// <TabGroup/>

export default UserMainPage;