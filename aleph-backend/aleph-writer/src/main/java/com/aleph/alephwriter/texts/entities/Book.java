package com.aleph.alephwriter.texts.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToMany;

import java.util.Set;

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
    private Integer subdivisions;

    @Column(name = "subdivision_name", nullable = false)
    private String subdivisionName;

    @Column(name = "dynamo_links")
    private String dynamoLinks;

    @ManyToMany(mappedBy = "books")
    private Set<User> users;

    // Getters and setters
}

