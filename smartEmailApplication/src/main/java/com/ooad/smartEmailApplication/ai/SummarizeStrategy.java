package com.ooad.smartEmailApplication.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ooad.smartEmailApplication.model.Email;

import java.util.HashMap;
import java.util.Map;

@Component
public class SummarizeStrategy implements EmailActionStrategy {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String aiServiceUrl = "https://neuromail-ai.onrender.com/ai-api/summarize";

    @Override
    public String execute(Email email) {
        // Prepare the request payload
        Map<String, String> requestPayload = new HashMap<>();
        requestPayload.put("text", email.getBody()); // Map the email body to the "text" field

        // Make API call to your Python AI service
        try {
            String response = restTemplate.postForObject(aiServiceUrl, requestPayload, String.class);

            // Parse the JSON response to extract the "summary" field
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            return jsonNode.get("summary").asText(); // Extract and return the summary text
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
