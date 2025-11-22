package com.hms.hospital_management_system.service;

import com.hms.hospital_management_system.dto.UserRequest;
import com.hms.hospital_management_system.dto.UserResponse;
import com.hms.hospital_management_system.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserResponse registerUser(UserRequest request);
    UserResponse loginUser(UserRequest request);
    UserResponse verifyOtp(String email, String otp);
    UserResponse updateUser(Long id, UserRequest request);
    void deleteUser(Long id);
    Optional<UserResponse> getUserById(Long id);
    List<UserResponse> getAllUsers();
}
