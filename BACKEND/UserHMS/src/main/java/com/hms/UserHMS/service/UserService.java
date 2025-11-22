package com.hms.UserHMS.service;


import com.hms.UserHMS.dto.UserRequest;
import com.hms.UserHMS.dto.UserResponse;
import com.hms.UserHMS.exception.HmsException;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserResponse registerUser(UserRequest request) throws HmsException;
    UserResponse loginUser(UserRequest request) throws HmsException;
    UserResponse verifyOtp(String email, String otp) throws HmsException;
    void resendOtp(String email) throws HmsException;
    UserResponse updateUser(Long id, UserRequest request) throws HmsException;
    void deleteUser(Long id) throws HmsException;
    Optional<UserResponse> getUserById(Long id);
    List<UserResponse> getAllUsers();
}
