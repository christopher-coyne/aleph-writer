import styled from "styled-components";

export const Container = styled.div<{ height: number | undefined }>`
  width: 100%;
  border: 1px solid red;
  ${(props) => props.height && `height: ${props.height}px;`}
  display: flex;
  justify-content: center;
  align-items: center;
`;
