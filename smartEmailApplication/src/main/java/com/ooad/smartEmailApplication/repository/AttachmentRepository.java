package com.ooad.smartEmailApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ooad.smartEmailApplication.model.Attachment;

public interface AttachmentRepository extends MongoRepository<Attachment, String> {
}