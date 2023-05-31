package com.aleph.alephwriter.texts.dto;

/*

{"id":"chatcmpl-7MMTm0E1ltZKwL9tslPOKb90Ttj89","object":"chat.completion","created":1685563982,"model":"gpt-3.5-turbo-0301","usage":{"prompt_tokens":15,"completion_tokens":7,"total_tokens":22},"choices":[{"message":{"role":"assistant","content":"The opposite of sad is happy."},"finish_reason":"stop","index":0}]}
 */
public class OpenApiResponse {
    private String id;

    private String object;
    private int created;
    private String model;

    private OpenAiUsage usage;

    private OpenAiChoice[] choices;

    public OpenApiResponse() {}
    public String getId() {
        return id;
    }

    public String getObject() {
        return object;
    }

    public int getCreated() {
        return created;
    }

    public String getModel() {
        return model;
    }

    public OpenAiChoice[] getChoices() {
        return choices;
    }

    public OpenAiUsage getUsage() {
        return usage;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public void setCreated(int created) {
        this.created = created;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setChoices(OpenAiChoice[] choices) {
        this.choices = choices;
    }

    public void setUsage(OpenAiUsage usage) {
        this.usage = usage;
    }
}
