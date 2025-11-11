package com.ooad.smartEmailApplication.service;

import com.ooad.smartEmailApplication.model.Admin;
import com.ooad.smartEmailApplication.model.User;
import com.ooad.smartEmailApplication.repository.AdminRepository;
import com.ooad.smartEmailApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public void deleteEmail(String userEmail, String emailId) {
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        user.getInbox().getEmails().removeIf(email -> email.getId().equals(emailId));
        userRepository.save(user);
    }
}