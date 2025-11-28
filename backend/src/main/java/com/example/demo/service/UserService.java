package com.example.demo.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository repo) {
        this.userRepository = repo;
    }

    // Register and persist
    public User register(String username, String passwordHash, String email) {

        Optional<User> existing = userRepository.findByUsername(username);

        if (existing.isPresent()) {
            throw new UserAlreadyExistsException("Username already taken");
        }
        User u = new User();
        u.setUserId(UUID.randomUUID().toString());
        u.setUsername(username);
        u.setPasswordHash(passwordHash);
        u.setEmail(email);
        // u.setMonthlyGoal(monthlyGoal);
        userRepository.save(u);
        return u;
    }

    public User findByUsername(String username) {
        Optional<User> opt = userRepository.findByUsername(username);
        return opt.orElse(null);
    }
}
