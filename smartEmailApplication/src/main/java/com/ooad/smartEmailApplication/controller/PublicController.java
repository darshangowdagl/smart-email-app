package com.ooad.smartEmailApplication.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "*") // Add this for frontend access
public class PublicController {

    @GetMapping("/health-check")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Server is running!");
    }
}
