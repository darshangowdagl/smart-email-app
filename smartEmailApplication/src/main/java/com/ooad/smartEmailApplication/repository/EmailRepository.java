package com.ooad.smartEmailApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ooad.smartEmailApplication.model.Email;

public interface EmailRepository extends MongoRepository<Email, String> {
}
