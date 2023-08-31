import React, { useContext } from "react";
import { Nav, Logo } from "./Navbar.styled";
import { LinkButton } from "../Button/styled.button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../Button/styled.button";
import { ThemeContext } from "../../providers/mode";
import { UL } from "../UL/UL.styled";

export const Navbar = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  return (
    <Nav darkMode={darkMode}>
      <Logo>Aleph writer</Logo>{" "}
      <UL spacing={1} direction="row" alignItems="center">
        <li>
          <Button onClick={toggleTheme} color="lx" hover darkMode={darkMode}>
            <FontAwesomeIcon icon={faMoon} size="lg" color="black" />
          </Button>
        </li>
        <li>
          <Button outline color="lx" hover darkMode={darkMode}>
            Login
          </Button>
        </li>{" "}
        <li>
          <LinkButton href="/">About</LinkButton>
        </li>
      </UL>
    </Nav>
  );
};
