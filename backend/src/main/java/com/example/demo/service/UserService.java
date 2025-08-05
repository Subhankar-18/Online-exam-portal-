package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Authenticate user (plain text password comparison)
    public Optional<User> authenticate(String email, String password, String role) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Compare plain password and role
            if (password.equals(user.getPassword()) && role.equals(user.getRole())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    // Admin adds student/instructor (stores plain password)
    public User addUser(User user) {
        return userRepository.save(user); // No encoding
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
