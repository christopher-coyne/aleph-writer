package com.aleph.alephwriter.texts;

import com.aleph.alephwriter.texts.dto.OpenApiResponse;
import com.aleph.alephwriter.texts.models.*;
import com.aleph.alephwriter.texts.models.Subdivisions.Subdivision;
import com.aleph.alephwriter.texts.services.OpenApiService;
import com.aleph.alephwriter.utils.ReadText;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/texts")
@CrossOrigin(origins = "*")
public class TextController {
    private final OpenApiService openApiService;

    @Autowired
    TextController(OpenApiService openApiService) {
        this.openApiService = openApiService;
    }

    /*
    @GetMapping("/{textId}/local-info/{filter}/")
    public ResponseEntity<GlobalInfo> getTextGlobalInfo(@PathVariable int textId) {

        // mock data for the time being
        int[] subdivs = {1, 4};
        Quote globalQuote = new Quote("“Nothing can come of nothing, speak again. Now, gods, stand up for bastards! To have a thankless child! Thou shouldst not have been old till thou hadst been wise.”", subdivs);
        Subdivision[] subdivisionArray = {new Subdivision("", 4), new Subdivision("", 4)};
        Subdivisions globalSubdivisions = new Subdivisions("act", "scene", subdivisionArray);
        GlobalInfo global = new GlobalInfo( "At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt \n At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt\n At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt", globalQuote, "1604", "6 acts", "drama", "william shakespeare", globalSubdivisions);

        return ResponseEntity.ok(global);
    }
    */

    @GetMapping("/{textId}/global-info")
    public ResponseEntity<GlobalInfo> getTextGlobalInfo(@PathVariable int textId) {

        // mock data for the time being
        int[] subdivs = {1, 4};
        Quote globalQuote = new Quote("“Nothing can come of nothing, speak again. Now, gods, stand up for bastards! To have a thankless child! Thou shouldst not have been old till thou hadst been wise.”", subdivs);
        Subdivision[] subdivisionArray = {new Subdivision("", 4), new Subdivision("", 4)};
        Subdivisions globalSubdivisions = new Subdivisions("act", "scene", subdivisionArray);
        GlobalInfo global = new GlobalInfo( "At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt \n At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt\n At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id aliquet risus feugiat in. Congue quisque egestas diam in arcu cursus euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Volutpat ac tincidunt", globalQuote, "1604", "6 acts", "drama", "william shakespeare", globalSubdivisions);

        return ResponseEntity.ok(global);
    }

    @GetMapping("/{textId}/local-info/{filter}")
    public ResponseEntity<ArrayList<Filter>> getFilterLocalInfo(@PathVariable String filter, @RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2) {

        // get local filter info for
        // mock data for the time being
        ArrayList<Filter> filters = openApiService.getLocalFilterInfo(filter, subdiv1, subdiv2);
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

        // mock data for the time being
        ArrayList<FocusQuote> focusQuotes = openApiService.getFocusQuotes(subdiv1, subdiv2, focus);

        return ResponseEntity.ok(focusQuotes);
    }

    @GetMapping("/{textId}/global-info/{filter}")
    public ResponseEntity<Filter[]> getFilterGlobalInfo(@PathVariable int textId, @PathVariable String filter) {

        Filter[] filterAnswers = {new Filter("Filial Ingratitude", "The theme of filial ingratitude runs throughout the play. Lear expects unconditional love and loyalty from his daughters, but is betrayed by them. The ingratitude displayed by Goneril and Regan reflects the breakdown of the parent-child bond and challenges traditional notions of familial duty.")};
        return ResponseEntity.ok(filterAnswers);
    }

    @GetMapping("/test")
    public String test() {

        // mock data for the time being

        return "hello";
    }
}
