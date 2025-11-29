package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.InvalidTransactionException;
import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/monthly-goal")
    public ResponseEntity<?> updateMonthlyGoal(
            @RequestBody Map<String, String> body,
            Authentication auth) {

        User user = (User) auth.getPrincipal();
        String email = user.getEmail();

        String newGoal = body.get("monthlyGoal");

        if (newGoal == null || newGoal.isBlank()) {
            throw new InvalidTransactionException("Monthly goal is required");
        }

        User updated = userService.updateMonthlyGoal(email, newGoal);

        return ResponseEntity.ok(updated);
    }

}
