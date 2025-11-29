package com.example.demo.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.exception.DatabaseException;
import com.example.demo.exception.InvalidTransactionException;
import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.exception.UserNotFoundException;
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

        if (username == null || username.isBlank()) {
            throw new InvalidTransactionException("Username is required");
        }
        if (passwordHash == null || passwordHash.isBlank()) {
            throw new InvalidTransactionException("Password is required");
        }
        if (email == null || email.isBlank()) {
            throw new InvalidTransactionException("Email is required");
        }

        try {
            boolean usernameExists = userRepository.findByUsername(username);
            if (usernameExists) {
                throw new UserAlreadyExistsException("Username already taken");
            }

            Optional<User> emailExists = userRepository.findByEmail(email);
            if (emailExists.isPresent()) {
                throw new UserAlreadyExistsException("User with email already exists");
            }

            User user = new User();
            user.setUserId(UUID.randomUUID().toString());
            user.setUsername(username);
            user.setPasswordHash(passwordHash);
            user.setEmail(email);

            userRepository.save(user);

            return user;

        } catch (UserAlreadyExistsException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Failed to register user");
        }
    }

    public boolean findByUsername(String username) {

        if (username == null || username.isBlank()) {
            throw new InvalidTransactionException("Username is required");
        }

        try {
            return userRepository.findByUsername(username);
        } catch (Exception e) {
            throw new DatabaseException("Failed to check username: " + username);
        }
    }

    public User findByEmail(String email) {

        if (email == null || email.isBlank()) {
            throw new InvalidTransactionException("Email is required");
        }

        try {
            Optional<User> opt = userRepository.findByEmail(email);
            return opt.orElse(null);
        } catch (Exception e) {
            throw new DatabaseException("Failed to find user by email: " + email);
        }
    }

    public User updateMonthlyGoal(String email, String newGoal) {

        try {
            // Step 1: Find user using email (via GSI)
            User user = findByEmail(email);
            if (user == null) {
                throw new UserNotFoundException("User not found with email: " + email);
            }

            String username = user.getUsername(); // this is the PK

            // Step 2: Update using PK (username)
            userRepository.updateMonthlyGoalByUsername(username, newGoal);

            // Step 3: Re-fetch updated user
            Optional<User> updated = userRepository.findByEmail(email);

            return updated.orElseThrow(() -> new UserNotFoundException("User not found after update: " + email));

        } catch (UserNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Failed to update monthly goal");
        }
    }

}
