package com.hms.UserHMS.controller;

import com.hms.UserHMS.dto.UserRequest;
import com.hms.UserHMS.dto.UserResponse;
import com.hms.UserHMS.dto.VerifyOtpRequest;
import com.hms.UserHMS.exception.HmsException;
import com.hms.UserHMS.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody UserRequest request) throws HmsException {
        UserResponse response = userService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> loginUser(@RequestBody UserRequest request) throws HmsException {
        UserResponse response = userService.loginUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<UserResponse> verifyOtp(@RequestBody VerifyOtpRequest request) throws HmsException {
        if (request.getEmail() == null || request.getOtp() == null ||
                request.getEmail().isBlank() || request.getOtp().isBlank()) {
            throw new HmsException("EMAIL_AND_OTP_REQUIRED", "400");
        }

        UserResponse response = userService.verifyOtp(request.getEmail().trim(), request.getOtp().trim());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestBody Map<String, String> request) throws HmsException {
        String email = request.get("email");
        if (email == null || email.isBlank()) {
            throw new HmsException("EMAIL_REQUIRED", "400");
        }

        userService.resendOtp(email.trim());
        return ResponseEntity.ok("OTP resent successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) throws HmsException {
        UserResponse response = userService.updateUser(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) throws HmsException {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND", "404"));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws HmsException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
