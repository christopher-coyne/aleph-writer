package com.aleph.alephwriter.texts.dto;

public class OpenAiChoice {
    private OpenAiMessage message;
    private String finish_reason;
    private int index;

    public OpenAiChoice() {}

    public OpenAiMessage getMessage() {
        return message;
    }

    public String getFinish_reason() {
        return finish_reason;
    }

    public int getIndex() {
        return index;
    }

    public void setMessage(OpenAiMessage message) {
        this.message = message;
    }

    public void setFinish_reason(String finish_reason) {
        this.finish_reason = finish_reason;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
