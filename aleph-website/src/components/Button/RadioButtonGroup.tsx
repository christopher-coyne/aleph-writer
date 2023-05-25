import React from "react";
// import { RadioListItem } from "../Button/styled.button";
import { RadioButton } from "./RadioButton";
import { Filters } from "./styled.button";
import { useSearchParams } from "react-router-dom";
import { filters } from "../../enums";

// radio buttons for changing filters
export const RadioButtonGroup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get("explore");

  return (
    <Filters>
      {filters.map((filter) => (
        <li
          onClick={() => {
            searchParams.set("explore", filter.val);
            setSearchParams(searchParams);
          }}
          key={filter.val}
        >
          <RadioButton
            name={filter.title}
            title={filter.val}
            isChecked={urlFilter === filter.val ? 1 : 0}
          />
        </li>
      ))}
    </Filters>
  );
  /*
  return (
    <>
      {buttons.map((button) => (
        <RadioListItem>
          <RadioButton name={button.name} title={button.title} />
        </RadioListItem>
      ))}
    </>
  );
  */
};
