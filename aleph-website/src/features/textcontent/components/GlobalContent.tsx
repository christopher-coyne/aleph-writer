import { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  QuoteContainer,
  Quotes,
  Quote,
  Filters,
  ExploreList,
} from "./GlobalContent.styled";
import { MyGlobalContext } from "../../texts/contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { exploreFilters } from "../../../constants";
import { RadioButton } from "../../../components/Button/RadioButton";
import { HLine } from "../../../components/HLine/HLine.styled";
import { Box } from "../../../components/Box/styled.box";

export const GlobalContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const explore = query.get("explore");
  const { themes, quote } = useContext(MyGlobalContext);

  console.log("THEMES ", themes);

  return (
    <Container>
      <Quote>{quote?.text}</Quote>
      <h2>Explore</h2>
      <HLine />
      <Filters>
        {exploreFilters.map((filter) => (
          <li
            onClick={() => {
              query.set("explore", filter);
              navigate(`${location.pathname}?${query.toString()}`);
            }}
            key={filter}
          >
            <RadioButton
              name={filter}
              title={filter}
              isChecked={explore === filter ? 1 : 0}
            />
          </li>
        ))}
      </Filters>
      <ExploreList>
        {themes.map((theme) => (
          <li key={theme.name}>
            <Box>
              <h3>{theme.name}</h3>
              <p>{theme.text}</p>
            </Box>
          </li>
        ))}
      </ExploreList>
    </Container>
  );
};
