package com.aleph.alephwriter.texts;

import com.aleph.alephwriter.texts.dto.OpenApiResponse;
import com.aleph.alephwriter.texts.models.Filter;
import com.aleph.alephwriter.texts.models.GlobalInfo;
import com.aleph.alephwriter.texts.models.Quote;
import com.aleph.alephwriter.texts.models.Subdivisions;
import com.aleph.alephwriter.texts.models.Subdivisions.Subdivision;
import com.aleph.alephwriter.texts.services.OpenApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/texts")
@CrossOrigin(origins = "*")
public class TextController {
    private final OpenApiService openApiService;

    @Autowired
    TextController(OpenApiService openApiService) {
        this.openApiService = openApiService;
    }

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
    public ResponseEntity<Filter[]> getFilterLocalInfo(@PathVariable String filter, @RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2) {

        // mock data for the time being
        Filter[] filterAnswers = {new Filter("Filial Ingratitude", "The theme of filial ingratitude runs throughout the play. Lear expects unconditional love and loyalty from his daughters, but is betrayed by them. The ingratitude displayed by Goneril and Regan reflects the breakdown of the parent-child bond and challenges traditional notions of familial duty.")};
        return ResponseEntity.ok(filterAnswers);
    }

    @GetMapping("/{textId}/summary")
    public ResponseEntity<String> getLocalSummary(@RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2) {

        // if no subdivisions, simply return from text id
        if (subdiv1 == null && subdiv2 == null) {
            return ResponseEntity.ok("hello");
        }
        // mock data for the time being
        return ResponseEntity.ok("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat ante sed lectus vulputate, sed molestie ante fringilla. In non consectetur diam. Nam nec scelerisque ex. Aliquam lacinia ipsum id nisi imperdiet, luctus dignissim sem mollis. Praesent tortor ligula, scelerisque sed imperdiet consequat, egestas non leo. Cras ullamcorper at lacus eu viverra. Ut fermentum velit eros, nec venenatis sem faucibus at. Maecenas suscipit sem diam, vulputate semper dolor mattis ut. Mauris et mi convallis, pellentesque justo vel, condimentum dolor. Sed vitae nisl lorem.");
    }

    @GetMapping("/openai/test")
    public ResponseEntity<OpenApiResponse> getTest() {

        OpenApiResponse myResponse = openApiService.getLocalSummary();
        return ResponseEntity.ok(myResponse);
        // mock data for the time being
    }

    @GetMapping("/{textId}")
    public ResponseEntity<String> getTextGlobalInfo(@RequestParam(required = false) String subdiv1, @RequestParam(required = false) String subdiv2) {

        // mock data for the time being
        try {
            String pathname = String.format("sample_texts/king_lear/act%s.scene%s.txt", subdiv1, subdiv2);
            ClassPathResource cpr = new ClassPathResource(pathname);
            byte[] dataArr = FileCopyUtils.copyToByteArray(cpr.getInputStream());
            String data = new String(dataArr, StandardCharsets.UTF_8);
            return ResponseEntity.ok(data);
        } catch(IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok("sup");
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
