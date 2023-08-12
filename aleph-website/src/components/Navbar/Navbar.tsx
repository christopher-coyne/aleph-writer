import React, { useContext } from "react";
import { Nav, Logo } from "./Navbar.styled";
import { LinkButton } from "../Button/styled.button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../Button/styled.button";
import { ThemeContext } from "../../providers/mode";

export const Navbar = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  return (
    <Nav darkMode={darkMode}>
      <Logo>Aleph writer</Logo>{" "}
      <Button onClick={toggleTheme}>
        <FontAwesomeIcon icon={faMoon} size="lg" />
      </Button>
      <ul>
        <li>
          <LinkButton href="/">Contact</LinkButton>
        </li>{" "}
        <li>
          <LinkButton href="/">About</LinkButton>
        </li>
      </ul>
    </Nav>
  );
};
