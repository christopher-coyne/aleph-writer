package com.aleph.alephwriter.texts.services;
import com.aleph.alephwriter.texts.dto.OpenAiBody;
import com.aleph.alephwriter.texts.dto.OpenApiResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpStatus;

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

    public OpenApiResponse getLocalSummary() {
        try {
            /*
            OpenAiBody myRequest = new OpenAiBody();
            OpenApiResponse responseEntity = restTemplate.postForObject(url, myRequest, OpenApiResponse.class);
            */
            OpenAiBody myRequest = new OpenAiBody();
            ObjectMapper mapper = new ObjectMapper();
            try {
                String json = mapper.writeValueAsString(myRequest);
                System.out.println(json);
            } catch (JsonProcessingException e) {
                System.out.println("JSON PROCESS ERROR");
                e.printStackTrace();
            }

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
                    .bodyToMono(OpenApiResponse.class)
                    .block();  // This forces the method to block until the response is received
            return responseEntity;
        } catch(Exception e) {
            System.out.println("error xyz " + e.toString());
        }
        return null;
    }
}
