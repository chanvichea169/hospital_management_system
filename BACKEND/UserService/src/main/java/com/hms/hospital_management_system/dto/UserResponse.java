package com.hms.hospital_management_system.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hms.hospital_management_system.enumeration.Roles;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Roles role;
    private String token;
}
