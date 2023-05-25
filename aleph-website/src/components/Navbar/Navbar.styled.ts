import styled from "styled-components";

export const Nav = styled.nav`
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(165, 165, 165, 0.25);

  & ul {
    display: inline;
    display: flex;
    gap: 20px;
    & li {
      display: inline;
      font-family: 16px;

      & a {
        text-decoration: none;
        color: black;
      }
    }
  }
`;

export const Logo = styled.div`
  font-family: "bitter";
  font-size: 20px;
  font-weight: 600;
`;
