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
        OpenAiBody myRequest = new OpenAiBody("give me 3 examples of " + filter + " in the following text from king lear. Provide them in the following format: name::explanation newline second name::second explanation newline, etc. Only provide the themes in the format I requested. Do not provide any other text \n" + text);

        OpenApiResponse responseEntity = webClient.post()
                .uri(url)
                .header("Authorization", "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(myRequest)
                .retrieve()
                .bodyToMono(OpenApiResponse.class)
                .block();  // This forces the method to block until the response is received

        // need to return filter info
        ArrayList<Filter> localFilters = new ArrayList<Filter>();
        String aiContent = responseEntity.getChoices()[0].getMessage().getContent();
        System.out.println("ai content " + aiContent);
        String[] stringFilters = aiContent.split("\n");
        for (String item : stringFilters) {
            System.out.println("item" + item);
            String[] itemSplit = item.split("::");
            if (itemSplit.length != 2) {
                continue;
            }
            System.out.println("item split " + itemSplit[0]);
            String itemName = itemSplit[0];
            String itemExplanation = itemSplit[1];
            localFilters.add(new Filter(itemName, itemExplanation));
        }

        return localFilters;
    }

    public String getLocalSummary(String subdiv1, String subdiv2) {
        try {
            String text = ReadText.getLocalText(subdiv1, subdiv2);
            OpenAiBody myRequest = new OpenAiBody("Give me a summary of a few sentences of what is happening in this passage of king lear " + text);

            System.out.println("adpi key " + apiKey);

            return "lorem ipsum 123";

            /*
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

             */
                    /*
                    .bodyToMono(String.class)
                    .doOnNext(response -> System.out.println("Raw response: " + response))  // Print out the raw response
                    .map(response -> {  // Then map the response to your OpenApiResponse
                        try {
                            return new ObjectMapper().readValue(response, OpenApiResponse.class);
                        } catch (JsonProcessingException e) {
                            System.out.println("error skdflsj " + e.getMessage());
                            throw new RuntimeException("Error parsing response abc", e);
                        }
                    })
                     */
            /*
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
