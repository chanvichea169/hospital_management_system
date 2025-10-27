package com.hms.hospital_management_system.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private boolean enabled;
    private String role;
    private String token;
    private Date createdAt;
    private Date updatedAt;
}
