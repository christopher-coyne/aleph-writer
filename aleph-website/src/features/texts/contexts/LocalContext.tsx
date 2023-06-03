import React, { createContext, useState, useCallback, Context } from "react";

type LocalInfoType = {
  text: string | undefined;
  theme: { name: string; text: string }[] | undefined;
  summary: string | undefined;
  focus: string | undefined;
};

type LocalContextType = LocalInfoType & {
  setLocalInfo: React.Dispatch<React.SetStateAction<LocalInfoType>>;
};

type Props = {
  children: React.ReactNode;
};

export const MyLocalContext = createContext<LocalContextType>({
  text: undefined,
  theme: [],
  summary: undefined,
  focus: undefined,

  setLocalInfo: ((_: LocalInfoType) => {}) as React.Dispatch<
    React.SetStateAction<LocalInfoType>
  >,
});
export const LocalContext = ({ children }: Props) => {
  const [localInfo, setLocalInfo] = useState<LocalInfoType>({
    text: "",
    theme: [],
    summary: "",
    focus: undefined,
  });

  return (
    <MyLocalContext.Provider
      value={{
        ...localInfo,
        setLocalInfo,
      }}
    >
      {children}
    </MyLocalContext.Provider>
  );
};
