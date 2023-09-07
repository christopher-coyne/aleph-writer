package com.aleph.alephwriter.texts.dao;
import org.springframework.stereotype.Repository;
import com.aleph.alephwriter.texts.entities.Book;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {

    private EntityManager entityManager;

    public BookDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    @Override
    public void save (Book book) {
        this.entityManager.persist(book);
    }

    @Override
    public List<Book> list () {
        TypedQuery<Book> bookQuery = entityManager.createQuery("FROM Book", Book.class);
        List<Book> books = bookQuery.getResultList();
        return books;
    }
}
