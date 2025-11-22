package com.hms.UserHMS.utility;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MessageUtil {

    @Value("${INVALID_CREDENTIALS}")
    private String invalidCredentials;

    @Value("${EMAIL_ALREADY_EXISTS}")
    private String emailAlreadyExists;

    @Value("${USER_NOT_FOUND}")
    private String userNotFound;

    @Value("${ROLE_NOT_FOUND}")
    private String roleNotFound;

    @Value("${USER_ALREADY_ENABLED}")
    private String userAlreadyEnabled;

    @Value("${NO_OTP_FOUND}")
    private String noOtpFound;

    @Value("${INVALID_OTP}")
    private String invalidOtp;

    public String invalidCredentials() { return invalidCredentials; }
    public String emailAlreadyExists() { return emailAlreadyExists; }
    public String userNotFound() { return userNotFound; }
    public String roleNotFound() { return roleNotFound; }
    public String userAlreadyEnabled() { return userAlreadyEnabled; }
    public String noOtpFound() { return noOtpFound; }
    public String invalidOtp() { return invalidOtp; }
}
