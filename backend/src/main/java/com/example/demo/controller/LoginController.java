package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to access
public class LoginController {

    @Autowired
    private UserService userService;

    // Handle login
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String role = request.get("role");

        Optional<User> user = userService.authenticate(email, password, role);
        if (user.isPresent()) {
            return Map.of("status", "success", "message", "Login successful");
        } else {
            return Map.of("status", "error", "message", "Invalid credentials or role");
        }
    }
}
