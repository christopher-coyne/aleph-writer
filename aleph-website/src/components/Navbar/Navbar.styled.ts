import styled from "styled-components";

export const Nav = styled.nav<{ darkMode: string }>`
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(165, 165, 165, 0.25);
  background-color: ${(props) => props.theme.color[props.darkMode].background};

  & li {
    display: inline;
    font-family: 16px;

    & a {
      text-decoration: none;
      color: black;
    }
  }
`;

export const Logo = styled.div`
  font-family: "bitter";
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: bold;
`;
