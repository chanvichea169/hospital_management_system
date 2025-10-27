package com.hms.hospital_management_system.service.handler;

import com.hms.hospital_management_system.dto.UserRequest;
import com.hms.hospital_management_system.dto.UserResponse;
import com.hms.hospital_management_system.model.Role;
import com.hms.hospital_management_system.model.User;
import com.hms.hospital_management_system.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class UserHandlerService {

    @Autowired
    private RoleRepository roleRepository;

    public void validateUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            log.error("Username is null or empty");
            throw new IllegalArgumentException("Username must not be null or empty");
        }
        if (!username.matches("^[a-zA-Z0-9_]+$")) {
            log.error("Username contains invalid characters: {}", username);
            throw new IllegalArgumentException("Username contains invalid characters");
        }
    }

    public void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            log.error("Email is null or empty");
            throw new IllegalArgumentException("Email must not be null or empty");
        }
        if (!email.matches("^[\\w-.]+@[\\w-]+\\.[a-zA-Z]{2,}$")) {
            log.error("Email format is invalid: {}", email);
            throw new IllegalArgumentException("Invalid email format");
        }
    }

    public User convertToUser(UserRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        Role role = roleRepository.findByName(request.getRole());
        user.setRole(role);
        user.setPassword(request.getPassword());
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        return user;
    }

    public UserResponse convertToUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole().getName());
        userResponse.setEnabled(user.isEnabled());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }
}
