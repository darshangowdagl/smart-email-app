package com.ooad.smartEmailApplication.controller;

import com.ooad.smartEmailApplication.exception.AccessDeniedException;
import com.ooad.smartEmailApplication.model.Email;
import com.ooad.smartEmailApplication.service.AIRecommendationService;
import com.ooad.smartEmailApplication.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emails")
@CrossOrigin(origins = "*")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private AIRecommendationService aiRecommendationService;

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestParam String to, @RequestBody Email email) {
        try {
            String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            Email sentEmail = emailService.sendEmail(authenticatedUserEmail, to, email);
            return ResponseEntity.ok(sentEmail);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{emailId}/star")
    public ResponseEntity<?> starEmail(@PathVariable String emailId) {
        try {
            String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            emailService.starEmail(emailId, authenticatedUserEmail);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email starred successfully.");
            return ResponseEntity.ok(response);
        } catch (AccessDeniedException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(403).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @DeleteMapping("/{emailId}")
    public ResponseEntity<?> deleteEmail(@PathVariable String emailId) {
        try {
            String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            emailService.deleteEmail(emailId, authenticatedUserEmail);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email deleted successfully.");
            return ResponseEntity.ok(response);
        } catch (AccessDeniedException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(403).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterEmails(@RequestParam String criteria) {
        try {
            String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            List<Email> filteredEmails = emailService.filterEmailsByContent(criteria, authenticatedUserEmail);
            return ResponseEntity.ok(filteredEmails);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/get-inbox")
    public ResponseEntity<?> getInbox(@RequestParam String category) {
        try {
            String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            List<Email> inboxEmails = emailService.getInbox(authenticatedUserEmail, category);
            Map<String, List<Email>> response = new HashMap<>();
            response.put("emails", inboxEmails);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(404).body(error);
        }
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeEmail(@RequestBody Email email, @RequestParam String type) {
        try {
            String result = aiRecommendationService.analyzeEmail(email, type);
            Map<String, String> response = new HashMap<>();
            response.put("result", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}