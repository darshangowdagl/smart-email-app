package com.ooad.smartEmailApplication.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ooad.smartEmailApplication.model.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
