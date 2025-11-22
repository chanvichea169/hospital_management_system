package com.hms.hospital_management_system.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String email;
    private String password;
    private Long roleId;
    private String firstName;
    private String lastName;
    private String phone;
    private String avatar;
    private String address;
    private String gender;
    private String dob;
}
