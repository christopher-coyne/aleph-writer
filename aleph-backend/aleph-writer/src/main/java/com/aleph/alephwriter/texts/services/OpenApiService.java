package com.aleph.alephwriter.texts.services;
import com.aleph.alephwriter.texts.dto.OpenAiBody;
import com.aleph.alephwriter.texts.dto.OpenApiResponse;
import com.aleph.alephwriter.texts.models.Filter;
import com.aleph.alephwriter.texts.models.FocusQuote;
import com.aleph.alephwriter.utils.ReadText;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpStatus;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;

/*
WebClient webClient = WebClient.create();
String url = "https://api.example.com/data";
 */
@Component
public class OpenApiService {

    @Value("${openai.apikey}")
    private String apiKey;
    RestTemplate restTemplate;
    private static final String url = "https://api.openai.com/v1/chat/completions";
    private WebClient webClient;

    public OpenApiService() {
        this.webClient = WebClient.create();
        this.restTemplate = new RestTemplate();
    }

    public ArrayList<Filter> getLocalFilterInfo(String filter, String subdiv1, String subdiv2) {
        String text = ReadText.getLocalText(subdiv1, subdiv2);
        OpenAiBody myRequest = new OpenAiBody("list 3 examples of " + filter + " in the following text from king lear. provide the list as an ordered list \n" + text);

        OpenApiResponse responseEntity = webClient.post()
                .uri(url)
                .header("Authorization", "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(myRequest)
                .retrieve()
                .bodyToMono(OpenApiResponse.class)
                .block();  // This forces the method to block until the response is received
        
        ArrayList<Filter> localFilters = new ArrayList<Filter>();
        String aiContent = responseEntity.getChoices()[0].getMessage().getContent();
        System.out.println("response for local filter " + aiContent);
        String[] contentBlocks = aiContent.split("\n");

        System.out.println("content " + aiContent);

        for (int i = 0; i < contentBlocks.length; i++) {
            if (contentBlocks[i].length() >= 2) {
                // String cleanedBlock = contentBlocks[i].replaceAll("\n", "");
                System.out.println("adding... "+ contentBlocks[i]);
                if (Character.isDigit(contentBlocks[i].charAt(0))) {
                    if (contentBlocks[i].charAt(1) == '.') {
                        localFilters.add(new Filter("test" + i, contentBlocks[i]));
                    }
                }
            }
        }

        System.out.print("full result \n");
        for (int i = 0; i < localFilters.size(); i++) {
            System.out.print(localFilters.get(i) + " ");
        }

        return localFilters;
    }

    public String getLocalSummary(String subdiv1, String subdiv2) {
        try {
            String text = ReadText.getLocalText(subdiv1, subdiv2);
            return "hello wrold";
            /*
            OpenAiBody myRequest = new OpenAiBody("Give me a summary of a few sentences of what is happening in this passage of king lear " + text);

            OpenApiResponse responseEntity = webClient.post()
                    .uri(url)
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(myRequest)
                    .retrieve()
                    .onStatus(httpStatus -> httpStatus.isError(), clientResponse ->
                            clientResponse.bodyToMono(String.class)
                                    .map(errorBody ->
                                            new RuntimeException(
                                                    "An error occurred while calling the API. Status code: " + clientResponse.statusCode()
                                                            + ", Error Body: " + errorBody
                                            )
                                    )
                    )
                    .bodyToMono(OpenApiResponse.class)
                    .block();  // This forces the method to block until the response is received
            return responseEntity.getChoices()[0].getMessage().getContent();
            */
        } catch(Exception e) {
            System.out.println("error xyz " + e.toString());
        }
        return null;
    }

    public ArrayList<FocusQuote> getFocusQuotes(String subdiv1, String subdiv2, String focus) {
        try {
            String text = ReadText.getLocalText(subdiv1, subdiv2);
            OpenAiBody myRequest = new OpenAiBody("Give me a list of quotes that exemplify the theme of " + focus + ", from the following text. Provide it in the following format: quote::explanation newline quote::explanation, etc. It must be in the previous format, with the quote from the text followed by two semi colons, and then an explanation" + text);

            System.out.println("adpi key " + apiKey);

            OpenApiResponse responseEntity = webClient.post()
                    .uri(url)
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(myRequest)
                    .retrieve()
                    .onStatus(httpStatus -> httpStatus.isError(), clientResponse ->
                            clientResponse.bodyToMono(String.class)
                                    .map(errorBody ->
                                            new RuntimeException(
                                                    "An error occurred while calling the API. Status code: " + clientResponse.statusCode()
                                                            + ", Error Body: " + errorBody
                                            )
                                    )
                    )
                    .bodyToMono(OpenApiResponse.class)
                    .block();  // This forces the method to block until the response is received

            ArrayList<FocusQuote> focusQuotes= new ArrayList<FocusQuote>();
            String aiContent = responseEntity.getChoices()[0].getMessage().getContent();
            System.out.println("ai content " + aiContent);
            String[] stringFocusQuotes = aiContent.split("\n");
            for (String item : stringFocusQuotes) {
                System.out.println("item" + item);
                String[] itemSplit = item.split("::");
                if (itemSplit.length != 2) {
                    continue;
                }
                System.out.println("item split " + itemSplit[0]);
                String itemQuote = itemSplit[0];
                String itemExplanation = itemSplit[1];
                focusQuotes.add(new FocusQuote(itemExplanation, itemQuote));
            }
            return focusQuotes;
        } catch(Exception e) {
            System.out.println("error xyz " + e.toString());
        }
        return null;
    }
}
