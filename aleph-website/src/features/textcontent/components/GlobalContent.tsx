import { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { filters } from "../../../enums/index";
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
import { RadioButtonGroup } from "../../../components/Button/RadioButtonGroup";

export const GlobalContent = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const explore = query.get("filter");
  const { globalFilters, quote } = useContext(MyGlobalContext);

  const activeFilter = filters.find((filterType) => filterType.val === explore);

  console.log("THEMES ", filters);

  console.log("global filters ", globalFilters);

  console.log("active filter : ", activeFilter);

  return (
    <Container>
      <Quote>{quote?.text}</Quote>
      <h2>Explore</h2>
      <HLine />
      <Filters>
        <RadioButtonGroup />
      </Filters>
      <ExploreList>
        {activeFilter &&
          globalFilters[activeFilter.val].map((filterInfo) => (
            <li key={filterInfo.name}>
              <Box>
                <h3>{filterInfo.name}</h3>
                <p>{filterInfo.text}</p>
              </Box>
            </li>
          ))}
      </ExploreList>
    </Container>
  );
};

/*

globalFilters[activeFilter.val].map((theme) => (
            <li key={theme.name}>
              <Box>
                <h3>{theme.name}</h3>
                <p>{theme.text}</p>
              </Box>
            </li>

            */
