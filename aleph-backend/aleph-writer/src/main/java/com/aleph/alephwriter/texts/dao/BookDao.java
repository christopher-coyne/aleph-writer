package com.aleph.alephwriter.texts.dao;
import java.util.List;

import com.aleph.alephwriter.texts.entities.Book;

public interface BookDao {
    void save (Book book);
    List<Book> list ();
}
