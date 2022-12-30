import React, { useState, useEffect } from "react";
//  import "./App.css";
import axios from "axios";
import Button from "../UI/Button/Button";
import classes from './Search.module.css';

function Search(props) {
  
 const onChangeSearch = (event) => {
 
  props.search(event.target.value)
 } 
 
return(
  <div className={classes.wrap}>
  
      <input
          type="text"
          placeholder="Search.."
          onChange={onChangeSearch}
          />
    </div>

);

}

export default Search;