import styled from "styled-components";

// Link that is styled as a button
export const Grid = styled.div`
  padding: ${(props) => props.theme.padding.medium};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadow};
`;
