package com.ooad.smartEmailApplication.service;

import com.ooad.smartEmailApplication.model.Email;
import com.ooad.smartEmailApplication.model.Inbox;
import com.ooad.smartEmailApplication.model.User;
import com.ooad.smartEmailApplication.repository.EmailRepository;
import com.ooad.smartEmailApplication.repository.InboxRepository;
import com.ooad.smartEmailApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InboxRepository inboxRepository;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User signup(User user) {
        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + user.getEmail());
        }

        // Create new inbox for user
        Inbox inbox = new Inbox();
        inbox = inboxRepository.save(inbox);

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setInbox(inbox);

        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new BadCredentialsException("Invalid credentials");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return userOpt;
    }

    public Email fetchEmail(String emailId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getEmails().stream()
                .filter(email -> email.getId().equals(emailId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Email not found"));
    }
}