package com.hms.hospital_management_system.repository;

import com.hms.hospital_management_system.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

}
