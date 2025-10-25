package com.hms.hospital_management_system.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hms.hospital_management_system.enumeration.Roles;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserRequest {
    @JsonProperty("username")
    private String username;
    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;
    @JsonProperty("role")
    private Roles role;
}
