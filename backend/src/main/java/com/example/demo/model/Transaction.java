package com.example.demo.model;

import java.time.Instant;

import lombok.Data;

@Data
public class Transaction {
  private String userId;        // partition key
  private String transactionId; // sort key (uuid or timestamp-id)
  private String type;         // "INCOME" or "EXPENSE"
  private Double amount;
  private String description;
  private String category;
  private Instant timestamp;

  private Instant currency;
  private Instant paymentMethod;
}
