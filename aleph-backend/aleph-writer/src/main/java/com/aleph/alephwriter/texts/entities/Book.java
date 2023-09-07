package com.aleph.alephwriter.texts.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;

import java.util.Set;

// title, author, genre, book_date, book_length, subdivisions, subdivision_name, dynamo_links, gutenberg_link
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String genre;

    @Column(name = "book_date", nullable = false)
    private String bookDate;

    @Column(name = "book_length", nullable = false)
    private String bookLength;

    @Column(nullable = false)
    private Integer subdivisions;

    @Column(name = "subdivision_name", nullable = false)
    private String subdivisionName;

    @Column(name = "dynamo_links")
    private String dynamoLinks;

    @Column(name = "gutenberg_link")
    private String gutenbergLink;

    @ManyToMany(mappedBy = "books")
    private Set<User> users;

    // Getters and setters
    public String getAuthor() {
        return this.author;
    }

    public Long getId() {
        return this.id;
    }
}

