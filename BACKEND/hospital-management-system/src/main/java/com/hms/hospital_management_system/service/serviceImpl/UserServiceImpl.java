package com.hms.hospital_management_system.service.serviceImpl;

import com.hms.hospital_management_system.Api.JwtUtil;
import com.hms.hospital_management_system.dto.UserRequest;
import com.hms.hospital_management_system.dto.UserResponse;
import com.hms.hospital_management_system.model.User;
import com.hms.hospital_management_system.repository.UserRepository;
import com.hms.hospital_management_system.service.UserService;
import com.hms.hospital_management_system.service.handler.UserHandlerService;
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

    @Override
    public UserResponse registerUser(UserRequest request) {
        userHandlerService.validateUsername(request.getUsername());
        userHandlerService.validateEmail(request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = userHandlerService.convertToUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String otp = generateOtp();
        user.setOtp(otp);
        user.setEnabled(false);

        userRepository.save(user);

        sendOtpEmail(user.getEmail(), otp);

        return userHandlerService.convertToUserResponse(user);
    }

    @Override
    public UserResponse loginUser(UserRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        UserResponse response = userHandlerService.convertToUserResponse(user);
        response.setToken(token);
        return response;
    }

    @Override
    public UserResponse verifyOtp(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtp() == null) {
            throw new RuntimeException("No OTP found for this user");
        }

        if (!user.getOtp().trim().equals(otp.trim())) {
            throw new RuntimeException("Invalid OTP");
        }

        user.setEnabled(true);
        user.setOtp(null);
        userRepository.save(user);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        final String token = jwtUtil.generateToken(userDetails);
        UserResponse response = userHandlerService.convertToUserResponse(user);
        response.setToken(token);

        return response;
    }

    @Override
    public void resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isEnabled()) {
            throw new RuntimeException("User is already enabled");
        }

        String otp = generateOtp();
        user.setOtp(otp);
        userRepository.save(user);

        sendOtpEmail(user.getEmail(), otp);
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userHandlerService.validateUsername(request.getUsername());
        userHandlerService.validateEmail(request.getEmail());

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        user.setRole(request.getRole());
        user.setUpdatedAt(new java.util.Date());

        userRepository.save(user);
        return userHandlerService.convertToUserResponse(user);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
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
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    private void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP for registration");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }
}
