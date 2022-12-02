import React from "react";
import AvailableCourses from "./AvailableCourses";
import classes from "./Courses.module.css";
import styled from 'styled-components';
import { useState } from "react";
import AddCourse from "./AddCourse";



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
  `}
  ${({ active }) =>
    active &&
    `
    font-family: 'Montserrat', sans-serif;
    opacity: 1;
    background-color: grey;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const types = ['View Course', 'Add New Course'];

const Courses = () => {

    const [active, setActive] = useState(types[0]);
    return (
        // <div className={classes.coursepage}>
        //     <h1>Courses</h1>
        //  <AvailableCourses />
        // </div>

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
            {active==='View Course' && <AvailableCourses />}

             {active === "Add New Course" && <AddCourse/>} 

            
          </div>



    </div>
    </div>
    
    );
};

export default Courses;