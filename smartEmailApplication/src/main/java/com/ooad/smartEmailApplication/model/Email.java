package com.ooad.smartEmailApplication.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "emails")
public class Email {
    @Id
    private String id;
    
    private String subject;
    private String body;
    private LocalDateTime timestamp;
    private boolean starred;
    private String sender;
    private String category;
    
    @DBRef
    private List<Attachment> attachments = new ArrayList<>();
}
