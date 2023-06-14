import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import { MyGlobalContext } from "../../texts/contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { exploreFilters } from "../../../constants";
import { RadioButton } from "../../../components/Button/RadioButton";
import { getExploreFilter } from "../api/getExploreFilter";
import { GlobalContent } from "./GlobalContent";
import { GlobalContainer, Quote, Filters } from "./GlobalContent.styled";
import { LocalContent } from "./LocalContent";
// import { RadioListItem } from "../../../components/Button/styled.button";

export const TextContent: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const view = query.get("view"); // Replace 'param1' with your actual parameter name
  const explore = query.get("explore");

  useEffect(() => {
    const fetchFilterData = async () => {
      if (explore === "themes") {
        const { data } = await getExploreFilter({ filter: explore });
        console.log("res ", data);
      }
    };
    fetchFilterData();
  }, [explore]);

  if (view === "local") {
    return <LocalContent />;
  }

  // global view of text content
  return (
    <GlobalContainer>
      <GlobalContent />
    </GlobalContainer>
  );
};

/*

{exploreFilters.map((filter) => (
          <li
            onClick={() => {
              query.set("explore", filter);
              navigate(`${location.pathname}?${query.toString()}`);
            }}
          >
            <RadioButton name={filter} title={filter} />
          </li>
        ))}
        */

export default TextContent;
