package com.aleph.alephwriter.texts.models;

public class GlobalInfo {
    public String summary;

    public Quote quote;

    public String written;

    public String length;

    public String genre;

    public String author;

    public Subdivisions subdivisions;
    public GlobalInfo(String summary, Quote quote, String written, String length, String genre, String author, Subdivisions subdivisions) {
        this.summary = summary;
        this.quote = quote;
        this.written = written;
        this.length = length;
        this.genre = genre;
        this.author = author;
        this.subdivisions = subdivisions;
    }
}
