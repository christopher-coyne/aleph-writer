import React, { useContext, useEffect } from "react";
import {
  Container,
  ModeButtonContainer,
  ModeButton,
  Content,
  FilterListItem,
} from "./Sidebar.styled";
import { useState } from "react";
import { Chat } from "./Chat";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getFocusQuotes } from "../api/getFocusQuotes";
import { Message } from "../types";
import { useLocalTextFilterData } from "../api/getLocalTextFilterData";
import { MyLocalContext } from "../../texts/contexts/LocalContext";
import { RadioButtonGroup } from "../../../components/Button/RadioButtonGroup";
import { getLocalSummary, useLocalSummary } from "../api/getLocalSummary";
import { GlobalPoints } from "./GlobalPoints";
import * as fuzzysort from "fuzzysort";
import { MyGlobalContext } from "../../texts/contexts/GlobalContext";
import { filters } from "../../../enums";
import { getMatchingQuote } from "../../test/getMatchingQuote";
import { useGlobalInfo } from "../../texts/api/getGlobalWorkInfo";

// works - homepage for all works (books, plays, poetry, lyrics...)
// works/hamlet_id - homepage for work - general view of work
// works/hamlet_id?act=2&scene=3 - Page specific work
export const Sidebar = () => {
  const [mode, setMode] = useState("analysis");
  const [messages, setMessages] = useState<Message[]>([]);
  const { setLocalInfo, theme, text } = useContext(MyLocalContext);

  const { data, isLoading, isError } = useGlobalInfo({ workId: "123" });

  console.log("theme  ", theme);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const subdiv1 = query.get("subdiv1");
  const subdiv2 = query.get("subdiv2");
  const filter = query.get("filter");
  const view = query.get("view");

  const navigate = useNavigate();

  const { data: globalInfoData } = useGlobalInfo({ workId: "123" });

  const { summary, focus, focusQuotes } = useContext(MyLocalContext);

  const { data: localTextFilterData } = useLocalTextFilterData({
    workId: "123",
    subdiv1,
    subdiv2,
    filter,
  });

  const { data: localSummary } = useLocalSummary({
    workId: "123",
    subdiv1,
    subdiv2,
  });

  // once focusQuotes is changed, alter the text to add highlighted areas
  useEffect(() => {
    if (focusQuotes.length && text) {
      const replacement = getMatchingQuote(text, focusQuotes);
      setLocalInfo((prevInfo) => ({ ...prevInfo, text: replacement }));
    }
  }, [focusQuotes]);

  // if focus is changed, grab new focus quotes. Replace quotes with fuzzy matching.
  useEffect(() => {
    const refetchFocusQuotes = async () => {
      if (focus && view === "local") {
        const { data } = await getFocusQuotes({
          subdiv1,
          subdiv2,
          focus,
        });
        console.log("focus quotes ", data);
        setLocalInfo((prevLocalInfo) => ({
          ...prevLocalInfo,
          focusQuotes: data,
        }));

        if (data.length) {
          if (text) {
            console.log("data for fuzzy ", data[0].text);
            const result = fuzzysort.single(data[0].text, text);
            console.log("fuzzy res ", result);
          }
        }
      }
    };
    refetchFocusQuotes();
  }, [focus]);

  console.log("local text filter ", localTextFilterData);

  return (
    <Container>
      <ModeButtonContainer>
        <ModeButton
          onClick={() => setMode("analysis")}
          active={mode === "analysis"}
        >
          Analysis
        </ModeButton>
        <ModeButton onClick={() => setMode("chat")} active={mode === "chat"}>
          Chat
        </ModeButton>
      </ModeButtonContainer>
      <Content>
        {mode === "analysis" ? (
          <>
            <h3>Summary</h3>
            <p>
              {view === "global"
                ? globalInfoData.data.summary
                : localSummary?.data}
            </p>
            {localTextFilterData && view === "local" && (
              <>
                <h3>Explore</h3>
                <RadioButtonGroup />
                <ul>
                  {localTextFilterData.data.map((theme: any) => (
                    <FilterListItem
                      selected={theme.name === focus}
                      onClick={() => {
                        navigate(`${location.pathname}?${query.toString()}`);
                      }}
                    >
                      <h3>{theme.name} </h3>
                      <p>{theme.text}</p>
                    </FilterListItem>
                  ))}
                </ul>
              </>
            )}
            {focusQuotes.map((quote) => (
              <>{quote.text}</>
            ))}
            {view === "global" && <GlobalPoints />}
          </>
        ) : (
          <Chat messages={messages} setMessages={setMessages} />
        )}
      </Content>
    </Container>
  );
};
