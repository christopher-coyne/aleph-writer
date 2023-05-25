import React, { useState, FormEvent, ChangeEvent } from "react";
import { Container } from "./Chat.styled";
import { postMessage } from "../api/sendChat";
import { Message } from "../types";
import { MessageContainer } from "./Chat.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const Chat = ({ messages, setMessages }: Props) => {
  const [chats, setChats] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const submitMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log(inputValue);
    // Clear the input field after form submission
    setInputValue("");

    const { data } = await postMessage({ data: inputValue });
    console.log("data ", data);

    if (data) {
      setMessages((prevChats) => [
        ...prevChats,
        { content: inputValue, type: "user" },
        { type: "assistant", content: data.choices[0].text },
      ]);
    } else {
      // setMessages((prevChats) => [...prevChats, inputValue, "ERROR"]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <Container>
      <ul>
        {messages.map((message) => (
          <MessageContainer key={message.content} type={message.type}>
            <p>{message.content}</p>
          </MessageContainer>
        ))}
      </ul>
      <form onSubmit={submitMessage}>
        <input
          type="text"
          placeholder="Send a message"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </form>
    </Container>
  );
};

export default Chat;
