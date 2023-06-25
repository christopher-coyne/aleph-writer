import React, { createContext, useState, useCallback, Context } from "react";

type FilterType = {
  name: string;
  text: string;
  quotes: { text: string; act: number; scene: number }[];
};

type GlobalInfoType = {
  quote:
    | {
        text: string;
        subdiv1: number | undefined;
        subdiv2: number | undefined;
        character: "King Lear";
      }
    | undefined;
  globalFilters: {
    themes: FilterType[];
    devices: FilterType[];
    characters: FilterType[];
    quotes: FilterType[];
    criticism: FilterType[];
    texts: FilterType[];
  };
  summary: string | undefined;
  written: string | undefined;
  author: string | undefined;
  genre: string | undefined;
  length: string | undefined;
  subdivisions:
    | {
        div1: string | undefined;
        div2: string | undefined;
        divisions: { subtitle: string | undefined; div2: number | undefined }[];
      }
    | undefined;
};

type GlobalContextType = GlobalInfoType & {
  setGlobalInfo: React.Dispatch<React.SetStateAction<GlobalInfoType>>;
};

type Props = {
  children: React.ReactNode;
};

export const MyGlobalContext = createContext<GlobalContextType>({
  quote: undefined,
  globalFilters: {
    themes: [],
    devices: [],
    characters: [],
    quotes: [],
    criticism: [],
    texts: [],
  },
  summary: undefined,
  written: undefined,
  author: undefined,
  genre: undefined,
  length: undefined,
  subdivisions: { div1: undefined, div2: undefined, divisions: [] },

  setGlobalInfo: ((_: GlobalInfoType) => {}) as React.Dispatch<
    React.SetStateAction<GlobalInfoType>
  >,
});
export const GlobalContext = ({ children }: Props) => {
  const [globalInfo, setGlobalInfo] = useState<GlobalInfoType>({
    quote: undefined,
    globalFilters: {
      themes: [],
      devices: [],
      characters: [],
      quotes: [],
      criticism: [],
      texts: [],
    },
    summary: undefined,
    written: undefined,
    author: undefined,
    genre: undefined,
    length: undefined,
    subdivisions: undefined,
  });

  return (
    <MyGlobalContext.Provider
      value={{
        ...globalInfo,
        setGlobalInfo,
      }}
    >
      {children}
    </MyGlobalContext.Provider>
  );
};
