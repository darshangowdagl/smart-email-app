package com.ooad.smartEmailApplication.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmailActionFactory {
    @Autowired
    private SummarizeStrategy summarizeStrategy;
    
    @Autowired
    private ReplySuggestionStrategy replySuggestionStrategy;
    
    @Autowired
    private CategorizeStrategy categorizeStrategy;
    
    public EmailActionStrategy getStrategy(String type) {
        switch (type.toLowerCase()) {
            case "summarize":
                return summarizeStrategy;
            case "reply":
                return replySuggestionStrategy;
            case "categorize":
                return categorizeStrategy;
            default:
                throw new IllegalArgumentException("Unknown strategy type: " + type);
        }
    }
}