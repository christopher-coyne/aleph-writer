import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const ModeButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const ModeButton = styled.button<{ active: boolean }>`
  width: 100%;
  border-radius: 6px;
  border: 0px;
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

export const Content = styled.div``;
