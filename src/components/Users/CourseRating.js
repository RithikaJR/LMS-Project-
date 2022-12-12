import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
// import { Container, Radio, Rating } from "./RatingStyles";

import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
   min-height: 10vh;
   font-size: 30px;
   margin-left:1100px;
`
export const Radio = styled.input`
   display: none;
`
export const Rating = styled.div`
   cursor: pointer;
`

const CourseRating = () => {
    
  const [rate, setRate] = useState(0);
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
                // alert(`Are you sure you want to give ${givenRating} stars ?`);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "#FDCC0D"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};
  
export default CourseRating;