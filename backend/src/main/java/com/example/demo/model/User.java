package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class User {
    private String userId;
    private String username;
    private String email;
    @JsonIgnore
    private String passwordHash;
    private String monthlyGoal;
}
