package com.aleph.alephwriter.texts.models;

public class AIFunction {
    public String name;
    public String description;

    public String text;

    public AIFunction(String name, String description, String text) {
        this.name = name;
        this.text = text;
        this.description = description;
    }
}
