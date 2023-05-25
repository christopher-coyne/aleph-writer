import React, { useContext, useEffect } from "react";
import {
  Container,
  ModeButtonContainer,
  ModeButton,
  Content,
} from "./Sidebar.styled";
import { useState } from "react";
import { Chat } from "./Chat";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MyContext } from "../../works/contexts/GlobalContext";
import { Message } from "../types";
import { getLocalTextFilterData } from "../api/getLocalTextFilterData";
import { MyLocalContext } from "../../works/contexts/LocalContext";
import { RadioButtonGroup } from "../../../components/Button/RadioButtonGroup";
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
  const focus = query.get("focus");
  const view = query.get("view");

  const navigate = useNavigate();

  const { summary } = useContext(MyContext);

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
            <p>{!chapter ? "GLOBAL SUMMARY" : summary}</p>
            <h3>Explore</h3>
            <RadioButtonGroup />
            {theme && (
              <ul>
                {theme?.map((theme) => (
                  <li
                    onClick={() => {
                      if (!focus) {
                        query.set("focus", theme.name);
                      } else {
                        query.delete("focus");
                      }
                      navigate(`${location.pathname}?${query.toString()}`);
                    }}
                  >
                    <h3>{theme.name} </h3>
                    <p>{theme.text}</p>
                  </li>
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
