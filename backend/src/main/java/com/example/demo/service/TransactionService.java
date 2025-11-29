package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.exception.DatabaseException;
import com.example.demo.exception.InvalidTransactionException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.TransactionNotFoundException;
import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public Transaction addTransaction(Transaction t) {

        // 1. Validate required fields (bad request)
        if (t.getUserId() == null || t.getUserId().isBlank()) {
            throw new InvalidTransactionException("UserId is required");
        }
        if (t.getType() == null || t.getType().isBlank()) {
            throw new InvalidTransactionException("Transaction type is required");
        }
        if (t.getAmount() == null || t.getAmount() <= 0) {
            throw new InvalidTransactionException("Amount must be greater than 0");
        }

        if (t.getTransactionId() == null) {
            t.setTransactionId(UUID.randomUUID().toString());
        }

        try {
            repository.save(t);
        } catch (Exception e) {
            throw new DatabaseException("Failed to save transaction");
        }
        return t;
    }

    public List<Transaction> getTransactionsForUser(String userId) {
        if (userId == null || userId.isBlank()) {
            throw new InvalidTransactionException("UserId is required");
        }

        try {
            List<Transaction> list = repository.findByUserId(userId);

            if (list == null || list.isEmpty()) {
                throw new ResourceNotFoundException("No transactions found for userId: " + userId);
            }
            return list;

        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("Failed to get transactions for uerId: " + userId);
        }
    }

    public Transaction updateTransaction(Transaction t) {

        if (t.getUserId() == null || t.getUserId().isBlank()) {
            throw new InvalidTransactionException("UserId is required for updating a transaction");
        }

        if (t.getTransactionId() == null || t.getTransactionId().isBlank()) {
            throw new InvalidTransactionException("TransactionId is required for updating a transaction");
        }

        Transaction existing = repository.findByTransactionId(
                t.getUserId(),
                t.getTransactionId());

        if (existing == null) {
            throw new TransactionNotFoundException(
                    "Transaction not found for userId: " + t.getUserId() +
                            " and transactionId: " + t.getTransactionId());
        }

        if (t.getType() != null)
            existing.setType(t.getType());
        if (t.getAmount() != null)
            existing.setAmount(t.getAmount());
        if (t.getDescription() != null)
            existing.setDescription(t.getDescription());
        if (t.getCategory() != null)
            existing.setCategory(t.getCategory());
        if (t.getCurrency() != null)
            existing.setCurrency(t.getCurrency());
        if (t.getPaymentMethod() != null)
            existing.setPaymentMethod(t.getPaymentMethod());
        if (t.getTimestamp() != null)
            existing.setTimestamp(t.getTimestamp());

        try {
            repository.update(existing);
        } catch (Exception e) {
            throw new DatabaseException("Failed to update transaction");
        }

        return existing;
    }

    // DELETE
    public void deleteTransaction(String userId, String transactionId) {

        // Validate inputs
        if (userId == null || userId.isBlank()) {
            throw new InvalidTransactionException("userId is required for deletion");
        }
        if (transactionId == null || transactionId.isBlank()) {
            throw new InvalidTransactionException("transactionId is required for deletion");
        }

        // Check if exists
        Transaction existing = repository.findByTransactionId(userId, transactionId);
        if (existing == null) {
            throw new TransactionNotFoundException(
                    "Transaction not found for userId: " + userId +
                            " and transactionId: " + transactionId);
        }

        // Try delete
        try {
            repository.delete(userId, transactionId);
        } catch (Exception e) {
            throw new DatabaseException(
                    "Failed to delete transaction with id: " + transactionId);
        }
    }

    public Transaction getTransactionById(String userId, String transactionId) {

        if (userId == null || userId.isBlank()) {
            throw new InvalidTransactionException("userId is required");
        }
        if (transactionId == null || transactionId.isBlank()) {
            throw new InvalidTransactionException("transactionId is required");
        }

        try {
            Transaction txn = repository.findByTransactionId(userId, transactionId);

            if (txn == null) {
                throw new TransactionNotFoundException(
                        "Transaction not found for userId: " + userId +
                                " and transactionId: " + transactionId);
            }

            return txn;

        } catch (TransactionNotFoundException e) {
            throw e; // let 404 propagate
        } catch (Exception e) {
            throw new DatabaseException(
                    "Failed to fetch transaction with id: " + transactionId);
        }
    }

}
