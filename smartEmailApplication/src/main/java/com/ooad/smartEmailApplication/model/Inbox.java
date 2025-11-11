package com.ooad.smartEmailApplication.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "inboxes")
public class Inbox {
    @Id
    private String id;
    
    @DBRef
    private List<Email> emails = new ArrayList<>();
    
    public List<Email> filterEmails(String criteria) {
        // Implementation for filtering emails
        return emails.stream()
            .filter(email -> email.getSubject().contains(criteria) || 
                    email.getBody().contains(criteria))
            .collect(java.util.stream.Collectors.toList());
    }
}
