package com.ooad.smartEmailApplication.ai;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ooad.smartEmailApplication.model.Email;

@Component
public class CategorizeStrategy implements EmailActionStrategy {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String aiServiceUrl = "https://neuromail-ai.onrender.com/ai-api/categorize";
    
    @Override
    public String execute(Email email) {
        Map<String, String> requestPayload = new HashMap<>();
        requestPayload.put("text", email.getBody());

        try {
            String response = restTemplate.postForObject(aiServiceUrl, requestPayload, String.class);
            
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);

            // Extract the fields from the response
            String category = jsonNode.get("category").asText();

            return category;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }    
    }
}
