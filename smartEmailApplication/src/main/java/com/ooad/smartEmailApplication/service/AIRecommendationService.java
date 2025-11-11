package com.ooad.smartEmailApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ooad.smartEmailApplication.ai.EmailActionFactory;
import com.ooad.smartEmailApplication.ai.EmailActionStrategy;
import com.ooad.smartEmailApplication.model.Email;

@Service
public class AIRecommendationService {
    @Autowired
    private EmailActionFactory emailActionFactory;
    
    public String analyzeEmail(Email email, String type) {
        EmailActionStrategy strategy = emailActionFactory.getStrategy(type);
        return strategy.execute(email);
    }
}
