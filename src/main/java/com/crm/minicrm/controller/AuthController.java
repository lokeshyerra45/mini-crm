package com.crm.minicrm.controller;

import org.springframework.web.bind.annotation.*;

import com.crm.minicrm.entity.User;
import com.crm.minicrm.repository.UserRepository;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userRepository.save(user);

    }

    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {

        User user = userRepository
                .findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {
            return null;
        }

        if (user.getPassword().equals(loginUser.getPassword())) {
            return user;
        }

        return null;
    }
}