import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh;
  overflow-y: scroll;

  & form {
    position: relative;
    & input {
      border: none;
      background-color: rgba(237, 237, 237, 1);
      border-radius: 4px;
      width: 100%;
      padding: 10px 20px 10px 5px;
      margin: 3px;
    }
    & button {
      position: absolute;
      right: 5px;
      bottom: 5px;
      border: none;
      background-color: rgba(237, 237, 237, 1);
      padding: 3px;
      border-radius: 3px;
      &:hover {
        cursor: pointer;
        color: black;
        background-color: ${(props) => props.theme.color.primary.l2};
      }
    }
  }
`;

export const MessageContainer = styled.li<{
  type: "user" | "assistant" | "system";
}>`
  border: ${(props) => (props.type === "user" ? "none" : "1px solid black")};
  background-color: ${(props) =>
    props.type === "user"
      ? `${props.theme.color.primary.l2}`
      : "1px solid black"};
  text-align: left;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 14px;
`;
