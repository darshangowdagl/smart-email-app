package com.ooad.smartEmailApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ooad.smartEmailApplication.model.Admin;

public interface AdminRepository extends MongoRepository<Admin, String> {
}