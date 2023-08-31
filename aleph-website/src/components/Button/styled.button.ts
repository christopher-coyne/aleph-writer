import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  darkMode?: string;
  outline?: boolean;
  hover?: boolean;
}

const colorToHover = (theme: any, color?: string, darkMode?: string) => {
  const declaration = "background-color: ";
  const newDarkMode = darkMode || "light";
  if (color === "primary") {
    return declaration + theme.color[newDarkMode]["d1"];
  }
  if (color === "l1") {
    return declaration + theme.color[newDarkMode]["primary"];
  }
  if (color === "l2") {
    return declaration + theme.color[newDarkMode]["l1"];
  }
  if (color === "lx") {
    return declaration + theme.color[newDarkMode]["l2"];
  }
  if (color === "d1") {
    return declaration + theme.color[newDarkMode]["d2"];
  }
  if (color === "d2") {
    return declaration + theme.color[newDarkMode]["dx"];
  }
  if (color === "dx") {
    return declaration + theme.color[newDarkMode]["d1"];
  }
  return declaration + theme.color[newDarkMode]["d2"];
};

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.color && props.darkMode
      ? props.theme.color[props.darkMode][props.color]
      : "black"};
  color: white;
  border: ${(props) => (props.outline ? "2px solid black" : "none")};
  border-radius: ${(props) => props.theme.borderRadius.small};
  padding: ${(props) => props.theme.buttonPadding.small};
  border: none;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    ${(props) => colorToHover(props.theme, props.color, props.darkMode)};
  }
`;

// Link that is styled as a button
export const LinkButton = styled.a`
  &:hover {
    background-color: #efefef;
  }

  transition: background-color 0.2s ease-in-out; // Adding transition
  border-radius: ${(props) => props.theme.borderRadius.small};
  padding: ${(props) => props.theme.buttonPadding.small};
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

export const Filters = styled.ul`
  display: block;
  & li {
    display: inline-block;
    position: relative;
    padding: 0px;
    margin: 3px 7px;
  }
`;
