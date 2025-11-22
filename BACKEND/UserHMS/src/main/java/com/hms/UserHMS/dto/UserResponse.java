package com.hms.UserHMS.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private boolean enabled;

    @JsonProperty("role")
    private String role;

    private String token;

    @JsonProperty("created_at")
    private Date createdAt;

    @JsonProperty("updated_at")
    private Date updatedAt;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    private String phone;
    private String avatar;
    private String address;
    private String gender;

    @JsonProperty("dob")
    private String dob;
}
