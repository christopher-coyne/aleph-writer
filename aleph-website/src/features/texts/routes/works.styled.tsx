import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  padding-top: 20px;
  gap: 10px;

  // sidebar and text content grow and shrink as needed
  & div {
    flex-basis: 50%;
  }
`;

export const Content = styled.div`
  & h1 {
    font-family: "bitter";
    font-size: 32px;
    font-weight: 600;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & h1 {
    flex-grow: 1;
    flex-shrink: 0;
  }

  & div {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
    display: flex;
    gap: 7px;
    align-self: center;
  }
`;

export const Sidebar = styled.div``;

export const SpecialButton = styled.button`
  border: none;
  background: linear-gradient(90deg, #844dba 0%, #910a7b 97.84%);
  border-radius: 50px;
  padding: 10px 23px;
  color: white;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;
