package com.ooad.smartEmailApplication.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ooad.smartEmailApplication.model.Email;
import com.ooad.smartEmailApplication.model.Inbox;
import com.ooad.smartEmailApplication.model.User;
import com.ooad.smartEmailApplication.repository.EmailRepository;
import com.ooad.smartEmailApplication.repository.InboxRepository;
import com.ooad.smartEmailApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmailService {
    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InboxRepository inboxRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String url = "http://localhost:8080/email-app/api/emails/analyze?type=categorize";

    public Email sendEmail(String from, String to, Email email) {
        User sender = userRepository.findByEmail(from)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User recipient = userRepository.findByEmail(to)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        // Set timestamp
        email.setTimestamp(LocalDateTime.now());
        email.setSender(sender.getEmail());

        String category = analyseEmailCategory(email);
        email.setCategory(category);

        // Save email
        Email savedEmail = emailRepository.save(email);

        // Update sender's sent emails
        sender.getEmails().add(savedEmail);
        userRepository.save(sender);

        // Update recipient's inbox
        recipient.getInbox().getEmails().add(savedEmail);
        inboxRepository.save(recipient.getInbox());

        return savedEmail;
    }

    private String analyseEmailCategory(Email email) {
        try {
            // Create headers and set Basic Auth credentials
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth("david@gmail.com", "david"); 

            // Prepare payload
            Map<String, String> requestPayload = new HashMap<>();
            requestPayload.put("subject", email.getSubject());
            requestPayload.put("body", email.getBody());

            // Wrap it in HttpEntity
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestPayload, headers);

            // Send POST request
            ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                String.class
            );

            // Parse the JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            String result = jsonNode.get("result").asText();

            return result.toLowerCase();

        } catch (Exception e) {
            System.out.println("Error occurred while fetching category: " + e);
            return "did not work";
        }
    }


    public void starEmail(String emailId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // We fetch the email directly
        Email email = emailRepository.findById(emailId)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        // Security Check: Ensure the email exists in user's inbox
        boolean isInInbox = user.getInbox().getEmails().stream()
                .anyMatch(e -> e.getId().equals(emailId));

        if (!isInInbox) {
            throw new RuntimeException("Access denied: Email not found in user's inbox.");
        }

        // Star it
        email.setStarred(true);
        emailRepository.save(email);
    }

    public void deleteEmail(String emailId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Inbox inbox = user.getInbox();

        boolean wasInInbox = inbox.getEmails().removeIf(email -> email.getId().equals(emailId));
        boolean wasInSent = user.getEmails().removeIf(email -> email.getId().equals(emailId));

        if (!wasInInbox && !wasInSent) {
            throw new RuntimeException("Access denied: Email not found in user's inbox or sent emails.");
        }

        // Save updated references
        inboxRepository.save(inbox);
        userRepository.save(user);

        // Delete the email document
        emailRepository.deleteById(emailId);
    }

    public List<Email> filterEmailsByContent(String criteria, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getInbox().filterEmails(criteria);
    }

    public List<Email> getInbox(String userEmail, String category) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Email> allEmails = user.getInbox().getEmails();
        
        // If category is null or "all", return all emails
        if (category == null || category.equalsIgnoreCase("all")) {
            return allEmails;
        }
        
        // Filter emails by category
        return allEmails.stream()
            .filter(email -> category.equalsIgnoreCase(email.getCategory()))
            .collect(Collectors.toList());
    }
}
