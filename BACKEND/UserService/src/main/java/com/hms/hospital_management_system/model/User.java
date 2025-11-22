package com.hms.hospital_management_system.model;

import com.hms.hospital_management_system.enumeration.Roles;
import jakarta.persistence.*;
import lombok.*;

import javax.management.relation.Role;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "tblusers")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Column(unique = true)
    private String email;
    private String password;
    private String otp;
    private boolean enabled;
    @Enumerated(EnumType.STRING)
    private Roles role;
    private Date createdAt;
    private Date updatedAt;
}
