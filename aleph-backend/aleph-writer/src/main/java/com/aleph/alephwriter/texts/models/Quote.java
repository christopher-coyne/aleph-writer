package com.aleph.alephwriter.texts.models;

public class Quote {
    public String text;
    public int[] subdivs;

    public Quote(String text, int[] subdivs) {
        this.text = text;
        this.subdivs = subdivs;
    }
}
