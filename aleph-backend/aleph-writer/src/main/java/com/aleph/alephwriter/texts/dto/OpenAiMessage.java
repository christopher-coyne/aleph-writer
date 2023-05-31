package com.aleph.alephwriter.texts.dto;

public class OpenAiMessage {
    private String role;
    private String content;

    public String getRole() {
        return role;
    }

    public String getContent() {
        return content;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public OpenAiMessage() {}

    public OpenAiMessage(String role, String content) {
        this.role = role;
        this.content = content;
    }
}
