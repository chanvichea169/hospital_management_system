package com.hms.UserHMS.service.serviceImpl;

import com.hms.UserHMS.jwt.JwtUtil;
import com.hms.UserHMS.dto.UserRequest;
import com.hms.UserHMS.dto.UserResponse;
import com.hms.UserHMS.exception.HmsException;
import com.hms.UserHMS.model.Role;
import com.hms.UserHMS.model.User;
import com.hms.UserHMS.model.UserProfile;
import com.hms.UserHMS.repository.RoleRepository;
import com.hms.UserHMS.repository.UserRepository;
import com.hms.UserHMS.service.UserService;
import com.hms.UserHMS.service.handler.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserHandlerService userHandlerService;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final RoleRepository roleRepository;

    @Override
    public UserResponse registerUser(UserRequest request) throws HmsException {
        userHandlerService.validateUsername(request.getUsername());
        userHandlerService.validateEmail(request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new HmsException("EMAIL_ALREADY_EXISTS");
        }

        User user = userHandlerService.convertToUser(request);

        if (request.getRoleId() != null) {
            Role role = roleRepository.findById(request.getRoleId())
                    .orElseThrow(() -> new HmsException("ROLE_NOT_FOUND"));
            user.setRole(role);
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        String otp = generateOtp();
        user.setOtp(otp);
        user.setEnabled(false);

        userRepository.save(user);
        sendOtpEmail(user.getEmail(), otp);

        return userHandlerService.convertToUserResponse(user);
    }

    @Override
    public UserResponse loginUser(UserRequest request) throws HmsException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new HmsException("INVALID_CREDENTIALS");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND"));

        UserResponse response = userHandlerService.convertToUserResponse(user);
        response.setToken(token);
        return response;
    }

    @Override
    public UserResponse verifyOtp(String email, String otp) throws HmsException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND"));

        if (user.getOtp() == null) {
            throw new HmsException("NO_OTP_FOUND");
        }

        if (!user.getOtp().trim().equals(otp.trim())) {
            throw new HmsException("INVALID_OTP");
        }

        user.setEnabled(true);
        user.setOtp(null);
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails);

        UserResponse response = userHandlerService.convertToUserResponse(user);
        response.setToken(token);

        return response;
    }

    @Override
    public void resendOtp(String email) throws HmsException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND"));

        if (user.isEnabled()) {
            throw new HmsException("USER_ALREADY_ENABLED");
        }

        String otp = generateOtp();
        user.setOtp(otp);
        userRepository.save(user);

        sendOtpEmail(user.getEmail(), otp);
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) throws HmsException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND"));

        userHandlerService.validateUsername(request.getUsername());
        userHandlerService.validateEmail(request.getEmail());

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getRoleId() != null) {
            Role role = roleRepository.findById(request.getRoleId())
                    .orElseThrow(() -> new HmsException("ROLE_NOT_FOUND"));
            user.setRole(role);
        }

        user.setUpdatedAt(new java.util.Date());

        UserProfile profile = user.getUserProfile();
        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
            user.setUserProfile(profile);
        }

        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setPhone(request.getPhone());
        profile.setAvatar(request.getAvatar());
        profile.setAddress(request.getAddress());
        profile.setGender(request.getGender());
        profile.setDob(request.getDob());

        userRepository.save(user);
        return userHandlerService.convertToUserResponse(user);
    }

    @Override
    public void deleteUser(Long id) throws HmsException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND"));

        userRepository.delete(user);
    }

    @Override
    public Optional<UserResponse> getUserById(Long id) {
        return userRepository.findById(id)
                .map(userHandlerService::convertToUserResponse);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userHandlerService::convertToUserResponse)
                .collect(Collectors.toList());
    }

    private String generateOtp() {
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000));
    }

    private void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP for registration");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }
}
