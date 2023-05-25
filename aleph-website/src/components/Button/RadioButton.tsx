import React from "react";
import { LinkButton } from "../Button/styled.button";
import { Radio, RadioLabel } from "./styled.button";

type Props = {
  name: string;
  title: string;
  isChecked: number;
};

export const RadioButton = ({ name, title, isChecked }: Props) => {
  return (
    <>
      <Radio type="radio" id={name} name={"xyz"} />
      <RadioLabel htmlFor={name} ischecked={isChecked}>
        {title}
      </RadioLabel>
    </>
  );
};
