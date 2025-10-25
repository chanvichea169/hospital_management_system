package com.hms.hospital_management_system.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class VerifyOtpRequest {
    @JsonProperty("email")
    private String email;

    @JsonProperty("otp")
    private String otp;
}
