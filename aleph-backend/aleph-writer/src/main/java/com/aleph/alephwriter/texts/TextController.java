package com.aleph.alephwriter.texts;

import com.aleph.alephwriter.texts.dto.OpenApiResponse;
import com.aleph.alephwriter.texts.models.*;
import com.aleph.alephwriter.texts.models.Subdivisions.Subdivision;
import com.aleph.alephwriter.texts.services.OpenApiService;
import com.aleph.alephwriter.texts.dao.BookDaoImpl;
import com.aleph.alephwriter.utils.ReadText;

import jakarta.persistence.EntityManager;

import com.aleph.alephwriter.texts.entities.Book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/texts")
@CrossOrigin(origins = "*")
public class TextController {
    private final OpenApiService openApiService;
    private final BookDaoImpl bookDaoImpl;

    @Autowired
    TextController(OpenApiService openApiService, BookDaoImpl bookDaoImpl) {
        this.openApiService = openApiService;
        this.bookDaoImpl = bookDaoImpl;
    }

    @GetMapping
    public ResponseEntity<ArrayList<BookDto>> getBooks() {
        List<Book> myBooks = this.bookDaoImpl.list();
        ArrayList<BookDto> booksDto = new ArrayList<BookDto>();
        for (Book book: myBooks) {
            BookDto newBook = new BookDto(book.getId(), book.getAuthor());
            booksDto.add(newBook);
        }

        return ResponseEntity.ok(booksDto);
    }

    @GetMapping("/{textId}/global-info")
    public ResponseEntity<GlobalInfo> getTextGlobalInfo(@PathVariable int textId) {

        // mock data for the time being
        int[] subdivs = {1, 4};
        Quote globalQuote = new Quote("“Nothing can come of nothing, speak again. Now, gods, stand up for bastards! To have a thankless child! Thou shouldst not have been old till thou hadst been wise.”", subdivs);
        Subdivision[] subdivisionArray = {new Subdivision("", 4), new Subdivision("", 4)};
        Subdivisions globalSubdivisions = new Subdivisions("act", "scene", subdivisionArray);
        GlobalInfo global = new GlobalInfo( "Global Summary - At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt \n At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt\n At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt", globalQuote, "1604", "6 acts", "drama", "william shakespeare", globalSubdivisions);

        return ResponseEntity.ok(global);
    }

    @GetMapping("/{textId}/local-info/{filter}")
    public ResponseEntity<ArrayList<Filter>> getFilterLocalInfo(@PathVariable String filter, @RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2) {

        // get local filter info for
        // mock data for the time being
        ArrayList<Filter> filters = openApiService.getLocalFilterInfo(filter, subdiv1, subdiv2);

        /*
        Filter filter1 = new Filter("Filter 1", "The theme of filial ingratitude runs throughout the play.");
        Filter filter2 = new Filter("Filter 2", "The theme of filial ingratitude runs throughout the play.");
        filters.add(filter1);
        filters.add(filter2);
        */
        // Filter[] filterAnswers = {new Filter("Filial Ingratitude", "The theme of filial ingratitude runs throughout the play. Lear expects unconditional love and loyalty from his daughters, but is betrayed by them. The ingratitude displayed by Goneril and Regan reflects the breakdown of the parent-child bond and challenges traditional notions of familial duty.")};
        return ResponseEntity.ok(filters);
    }

    @GetMapping("/{textId}/summary")
    public ResponseEntity<String> getLocalSummary(@RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2) {
        // if no subdivisions, simply return from text id
        if (subdiv1 == null && subdiv2 == null) {
            return ResponseEntity.ok("hello");
        }
        String summary = openApiService.getLocalSummary(subdiv1, subdiv2);
        // mock data for the time being
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/openai/test")
    public ResponseEntity<String> getTest() {

        String myResponse = openApiService.getLocalSummary("1", "2");
        return ResponseEntity.ok(myResponse);
        // mock data for the time being
    }

    @GetMapping("/{textId}")
    public ResponseEntity<String> getTextGlobalInfo(@RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2) {

        // mock data for the time being
        String localText = ReadText.getLocalText(subdiv1, subdiv2);

        return ResponseEntity.ok(localText);
    }

    @GetMapping("/{textId}/local-info/focus-quotes")
    public ResponseEntity<ArrayList<FocusQuote>> getFocusQuotes(@RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2, @RequestParam(required = false) String focus) {
        System.out.println("getting focus quotes... ");
        // mock data for the time being
        ArrayList<FocusQuote> focusQuotes = openApiService.getFocusQuotes(subdiv1, subdiv2, focus);

        return ResponseEntity.ok(focusQuotes);
    }

    @GetMapping("/{textId}/global-info/{filter}")
    public ResponseEntity<ArrayList<Filter>> getFilterGlobalInfo(@PathVariable int textId, @PathVariable String filter) {

        ArrayList filters = new ArrayList<Filter>();
        if (filter != null) {
            System.out.println("filter " + filter);
        }
        if (filter.equals("themes")) {
            System.out.println("returning...");
            Filter filterAnswer1 = new Filter("Filial Ingratitude", "The theme of filial ingratitude runs throughout the play. Lear expects unconditional love and loyalty from his daughters, but is betrayed by them. The ingratitude displayed by Goneril and Regan reflects the breakdown of the parent-child bond and challenges traditional notions of familial duty.");
            Filter filterAnswer2 = new Filter("Filial Ingratitude 2", "The theme of filial ingratitude runs throughout the play. Lear expects unconditional love and loyalty from his daughters, but is betrayed by them. The ingratitude displayed by Goneril and Regan reflects the breakdown of the parent-child bond and challenges traditional notions of familial duty.");
            filters.add(filterAnswer1);
            filters.add(filterAnswer2);
        } else {
            Filter filterAnswer1 = new Filter("NON THEMES", "The theme of filial ingratitude runs throughout the play. Lear expects unconditional love and loyalty from his daughters, but is betrayed by them. The ingratitude displayed by Goneril and Regan reflects the breakdown of the parent-child bond and challenges traditional notions of familial duty.");
            Filter filterAnswer2 = new Filter("NON THEMES 2", "The theme of filial ingratitude runs throughout the play. Lear expects unconditional love and loyalty from his daughters, but is betrayed by them. The ingratitude displayed by Goneril and Regan reflects the breakdown of the parent-child bond and challenges traditional notions of familial duty.");
            filters.add(filterAnswer1);
            filters.add(filterAnswer2);
        }
        return ResponseEntity.ok(filters);
    }

    @GetMapping("/test")
    public String test() {

        // mock data for the time being

        return "hello";
    }
}
