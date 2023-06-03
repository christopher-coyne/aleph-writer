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
import { MyContext } from "../../texts/contexts/GlobalContext";
import { Message } from "../types";
import { getLocalTextFilterData } from "../api/getLocalTextFilterData";
import { MyLocalContext } from "../../texts/contexts/LocalContext";
import { RadioButtonGroup } from "../../../components/Button/RadioButtonGroup";
import { getLocalSummary } from "../api/getLocalSummary";
import { filters } from "../../../enums";

// works - homepage for all works (books, plays, poetry, lyrics...)
// works/hamlet_id - homepage for work - general view of work
// works/hamlet_id?act=2&scene=3 - Page specific work
export const Sidebar = () => {
  const [mode, setMode] = useState("analysis");
  const [messages, setMessages] = useState<Message[]>([]);
  const { setLocalInfo, theme } = useContext(MyLocalContext);

  console.log("theme  ", theme);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const subdiv1 = query.get("subdiv1");
  const subdiv2 = query.get("subdiv2");
  const filter = query.get("explore");
  const view = query.get("view");

  const navigate = useNavigate();

  const { summary, focus } = useContext(MyLocalContext);

  // if focus is changed, grab new focus quotes. Replace quotes with fuzzy matching.
  /*
  useEffect(() => {
    const refetchLocalData = async () => {
      const { data } = await getLocalTextFilterData({
        subdiv1,
        subdiv2,
        filter,
      });
      console.log("theme local ", data);
      setLocalInfo((prevLocalInfo) => ({ ...prevLocalInfo, theme: data }));
    };
    if (view === "local") {
      refetchLocalData();
    }
  }, [focus]); 
  */

  useEffect(() => {
    const refetchLocalData = async () => {
      const { data } = await getLocalTextFilterData({
        subdiv1,
        subdiv2,
        filter,
      });
      console.log("theme local ", data);
      setLocalInfo((prevLocalInfo) => ({ ...prevLocalInfo, theme: data }));
    };
    if (view === "local") {
      refetchLocalData();
    }
  }, [subdiv1, subdiv2, filter]);

  useEffect(() => {
    const refetchLocalSummary = async () => {
      const { data } = await getLocalSummary({
        subdiv1,
        subdiv2,
      });
      console.log("theme local ", data);
      setLocalInfo((prevLocalInfo) => ({ ...prevLocalInfo, summary: data }));
    };
    if (view === "local") {
      refetchLocalSummary();
    }
  }, [subdiv1, subdiv2, filter]);

  console.log("local summary ", summary);

  const chapter = query.get("chapter");
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
            <p>{view === "global" ? "GLOBAL SUMMARY" : summary}</p>
            <h3>Explore</h3>
            <RadioButtonGroup />
            {theme && (
              <ul>
                {theme?.map((theme) => (
                  <FilterListItem
                    selected={theme.name === focus}
                    onClick={() => {
                      if (focus === theme.name) {
                        setLocalInfo((prevLocalInfo) => ({
                          ...prevLocalInfo,
                          focus: undefined,
                        }));
                      } else {
                        setLocalInfo((prevLocalInfo) => ({
                          ...prevLocalInfo,
                          focus: theme.name,
                        }));
                      }
                      navigate(`${location.pathname}?${query.toString()}`);
                    }}
                  >
                    <h3>{theme.name} </h3>
                    <p>{theme.text}</p>
                  </FilterListItem>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Chat messages={messages} setMessages={setMessages} />
        )}
      </Content>
    </Container>
  );
};
