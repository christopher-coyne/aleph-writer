import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 3px;
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
  padding: 10px 0px;
  font-size: 16px;
  transition: background-color 0.05s ease; /* Added transition */

  &:hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  padding: 20px;
`;

export const FilterListItem = styled.li<{ selected: boolean }>`
  ${(props) => props.selected && "border: 2px solid purple"};
`;
