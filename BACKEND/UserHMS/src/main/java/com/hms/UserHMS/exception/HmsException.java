package com.hms.UserHMS.exception;

public class HmsException extends Exception {
    private final String errorCode;

    public HmsException(String message) {
        super(message);
        this.errorCode = "400";
    }

    public HmsException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
