import styled from "styled-components";

// Link that is styled as a button
export const Stack = styled.div<{
  spacing: number;
  direction: "column" | "row";
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => props.theme.spacing[props.spacing]};
`;
