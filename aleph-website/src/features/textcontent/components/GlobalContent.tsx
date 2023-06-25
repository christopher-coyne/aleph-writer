import { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { filters } from "../../../enums/index";
import { useGlobalInfo } from "../../texts/api/getGlobalWorkInfo";
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
import { useFilter } from "../../texts/api/getExploreFilter";

export const GlobalContent = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const explore = query.get("filter");
  const { globalFilters, quote } = useContext(MyGlobalContext);
  const { data, isLoading, isError } = useGlobalInfo({ workId: "123" });
  const { data: globalFilterData } = useFilter({ filter: explore || "themes" });

  console.log("global data ", data);
  console.log("THEMES ", filters);

  // console.log("global filters ", globalFilters);

  console.log("Global data TEST ", globalFilterData);
  // console.log("ACTIVE FILTER TEST ", activeFilterTest);

  return (
    <Container>
      <Quote>{data?.data.quote?.text}</Quote>
      <h2>Explore</h2>
      <HLine />
      <Filters>
        <RadioButtonGroup />
      </Filters>
      <ExploreList>
        {globalFilterData &&
          globalFilterData.data.map((filterInfo: any) => (
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
