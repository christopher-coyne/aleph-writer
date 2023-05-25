import styled from "styled-components";

// Link that is styled as a button
export const LinkButton = styled.a`
  &:hover {
    background-color: #efefef;
  }

  transition: background-color 0.2s ease-in-out; // Adding transition
  padding: 5px 10px;
  border-radius: 6px;
`;

/*
export const RadioListItem = styled.li`
  float: left;
  margin: 0 5px 0 0;
  width: 100px;
  height: 40px;
  position: relative;
  text-align: center;

  & input,
  label {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;
*/

export const Radio = styled.input`
  visibility: hidden;
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 50%;
`;

export const RadioLabel = styled.label<{ ischecked: number }>`
  padding: 0px 10px;
  margin: 0px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${(props) => (props.ischecked ? "black" : "white")};
  border: 1px solid black;
  color: ${(props) => (props.ischecked ? "white" : "black")};
`;

export const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 6px;
  padding: 6px 11px;
  border: none;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`;

export const Filters = styled.ul`
  display: block;
  & li {
    display: inline-block;
    position: relative;
    padding: 0px;
    margin: 0px 7px;
  }
`;
