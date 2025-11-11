package com.ooad.smartEmailApplication.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ooad.smartEmailApplication.model.Email;

import java.util.HashMap;
import java.util.Map;

@Component
public class ReplySuggestionStrategy implements EmailActionStrategy {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String aiServiceUrl = "https://neuromail-ai.onrender.com/ai-api/suggestReply";

    @Override
    public String execute(Email email) {
        // Prepare the request payload
        Map<String, String> requestPayload = new HashMap<>();
        requestPayload.put("text", email.getBody());

        try {
            // Make the API call and get the response as a String
            String response = restTemplate.postForObject(aiServiceUrl, requestPayload, String.class);

            // Parse the JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);

            // Extract the fields from the response
            String body = jsonNode.get("reply").get("Body").asText();

            return body;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
