package com.ooad.smartEmailApplication.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "attachments")
public class Attachment {
    @Id
    private String id;
    private String filename;
    private Double size;
    private byte[] content;
}
