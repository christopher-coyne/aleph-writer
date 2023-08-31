import styled from "styled-components";

export const UL = styled.ul<{
  spacing: number;
  direction: "column" | "row";
  alignItems: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => props.theme.spacing[props.spacing]};
  align-items: ${(props) => props.alignItems};
  justify-content: center;
`;
