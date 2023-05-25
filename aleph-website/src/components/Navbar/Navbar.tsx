import React from "react";
import { Nav, Logo } from "./Navbar.styled";
import { LinkButton } from "../Button/styled.button";

export const Navbar = () => {
  return (
    <Nav>
      <Logo>Aleph writer</Logo>{" "}
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
