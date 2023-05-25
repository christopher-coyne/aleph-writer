import styled from "styled-components";

export const Container = styled.div``;

export const GlobalContainer = styled.div``;

export const Filters = styled.ul`
  display: block;
  & li {
    display: inline-block;
    position: relative;
    padding: 0px;
    margin: 0px 7px;
  }
`;

export const Quote = styled.p`
  font-family: "bitter";
  font-size: 20px;
  background-color: ${(props) => props.theme.color.primary.l2};
  padding: 10px;
  border-radius: 6px;
`;

export const QuoteContainer = styled.div`
  border: 2px solid black;
  padding: 10px;
  border-radius: 15px;
  transition: background-color 0.1s ease;

  &:hover {
    border: 2px solid ${(props) => props.theme.color.primary.d1};
    background-color: ${(props) => props.theme.color.primary.l2};
    cursor: pointer;
  }
`;

export const Quotes = styled.ul`
  display: flex;
  flex-direction: column;
  & li {
    padding: 10px 0px;
  }
`;
