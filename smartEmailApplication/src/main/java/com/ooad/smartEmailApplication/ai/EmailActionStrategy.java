package com.ooad.smartEmailApplication.ai;

import com.ooad.smartEmailApplication.model.Email;

public interface EmailActionStrategy {
    String execute(Email email);
}
