package com.ooad.smartEmailApplication.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "admins")
public class Admin extends Person {
    // Admin specific fields and methods
}
