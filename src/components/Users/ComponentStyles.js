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

// UserMainPage
export const Tab = styled.button`
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

export const ButtonGroup = styled.div`
  display: flex;
`;