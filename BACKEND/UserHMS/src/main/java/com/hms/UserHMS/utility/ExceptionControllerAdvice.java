package com.hms.UserHMS.utility;

import com.hms.UserHMS.exception.HmsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @Value("${INVALID_CREDENTIALS}")
    private String invalidCredentialsMessage;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfor> exceptionHandler(Exception e) {
        ErrorInfor errorInfo = new ErrorInfor(e.getMessage(), "500");
        return ResponseEntity.status(500).body(errorInfo);
    }

    @ExceptionHandler(HmsException.class)
    public ResponseEntity<ErrorInfor> hmsExceptionHandler(HmsException e) {
        String message = "INVALID_CREDENTIALS".equals(e.getMessage())
                ? invalidCredentialsMessage
                : e.getMessage();

        ErrorInfor errorInfo = new ErrorInfor(message, "400");
        return ResponseEntity.status(400).body(errorInfo);
    }
}
