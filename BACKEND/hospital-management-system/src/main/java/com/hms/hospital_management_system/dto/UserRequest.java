package com.hms.hospital_management_system.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String email;
    private String password;
    private Long roleId;
}
