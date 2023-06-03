package com.aleph.alephwriter.texts.dto;

import org.apache.logging.log4j.message.Message;

public class OpenAiBody {
    String model;
    OpenAiMessage[] messages;

    public String getModel() {
        return model;
    }

    public OpenAiMessage[] getMessages() {
        return messages;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setMessages(OpenAiMessage[] messages) {
        this.messages = messages;
    }

    public OpenAiBody() {
        this.model = "gpt-3.5-turbo";
        OpenAiMessage[] newMsgs = new OpenAiMessage[1];
        OpenAiMessage newMsg = new OpenAiMessage("user", "what is the oppose of sad?");
        newMsgs[0] = newMsg;
        this.messages = newMsgs;
    }

    public OpenAiBody(String userPrompt) {
        this.model = "gpt-3.5-turbo";
        OpenAiMessage[] newMsgs = new OpenAiMessage[1];
        OpenAiMessage newMsg = new OpenAiMessage("user", userPrompt);
        newMsgs[0] = newMsg;
        this.messages = newMsgs;
    }
}
