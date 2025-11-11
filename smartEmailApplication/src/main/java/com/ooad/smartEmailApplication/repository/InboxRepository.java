package com.ooad.smartEmailApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ooad.smartEmailApplication.model.Inbox;

public interface InboxRepository extends MongoRepository<Inbox, String> {
}
