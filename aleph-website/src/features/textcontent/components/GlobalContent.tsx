import { useContext, Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  QuoteContainer,
  Quotes,
  Quote,
  Filters,
} from "./GlobalContent.styled";
import { MyContext } from "../../texts/contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { exploreFilters } from "../../../constants";
import { RadioButton } from "../../../components/Button/RadioButton";

export const GlobalContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const explore = query.get("explore");
  const { themes, quote } = useContext(MyContext);

  return (
    <Container>
      <Quote>{quote?.text}</Quote>
      <h2>explore</h2>
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
      {explore === "themes" && themes.length && (
        <ul>
          {themes.map((theme) => (
            <Fragment key={theme.name}>
              <h3>{theme.name}</h3>
              <p>{theme.summary}</p>
              <Quotes></Quotes>
            </Fragment>
          ))}
        </ul>
      )}
    </Container>
  );
};
