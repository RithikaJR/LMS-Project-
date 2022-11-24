import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

const UserTab = () => {
  // npm install -f @material-ui/core
    const [value, setValue] = React.useState(2);
    return (
        <div>
        <h2>Users</h2>
        <Paper square>
          <Tabs
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <Tab label="All User" />
            <Tab label="Add Learning Admin" />
            {/* <Tab label="Disabled TAB!" disabled /> */}
            <Tab label="Upload Excel" />
          </Tabs>
          <h3>TAB NO: {value} clicked!</h3>
        </Paper>
      </div>
    );
  }
  
  export default UserTab;