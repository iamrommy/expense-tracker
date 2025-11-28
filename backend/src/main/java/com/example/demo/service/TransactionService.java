package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public Transaction addTransaction(Transaction t) {
        if (t.getTransactionId() == null) {
            t.setTransactionId(UUID.randomUUID().toString());
        }
        repository.save(t);
        return t;
    }

    public List<Transaction> getTransactionsForUser(String userId) {
        return repository.findByUserId(userId);
    }

    
    // UPDATE
    public Transaction updateTransaction(Transaction t) {
        repository.update(t);
        return t;
    }

    // DELETE
    public void deleteTransaction(String userId, String transactionId) {
        repository.delete(userId, transactionId);
    }
}
