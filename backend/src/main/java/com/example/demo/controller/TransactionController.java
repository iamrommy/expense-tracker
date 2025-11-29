package com.example.demo.controller;

import java.time.Instant;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService txService;

    public TransactionController(TransactionService txService) {
        this.txService = txService;
    }

    @PostMapping
    public ResponseEntity<?> addTransaction(@RequestBody Transaction t, Authentication auth) {
        User user = (User) auth.getPrincipal();
        String userId = user.getUserId();
        // use username as userId in this demo, or map to userId from userstore
        t.setUserId(userId);
        t.setTimestamp(Instant.now());
        var saved = txService.addTransaction(t);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions(Authentication auth) {
        User user = (User) auth.getPrincipal();
        String userId = user.getUserId();
        var list = txService.getTransactionsForUser(userId);
        return ResponseEntity.ok(list);
    }

    // UPDATE
    @PutMapping("/{transactionId}")
    public ResponseEntity<?> updateTransaction(
            @PathVariable String transactionId,
            @RequestBody Transaction t,
            Authentication auth) {

        User user = (User) auth.getPrincipal();
        String userId = user.getUserId();

        // Enforce user ID and transactionId
        t.setUserId(userId);
        t.setTransactionId(transactionId);

        Transaction newtxn = txService.updateTransaction(t);
        return ResponseEntity.ok(newtxn);
    }

    // DELETE
    @DeleteMapping("/{transactionId}")
    public ResponseEntity<?> deleteTransaction(
            @PathVariable String transactionId,
            Authentication auth) {

        User user = (User) auth.getPrincipal();
        String userId = user.getUserId();
        txService.deleteTransaction(userId, transactionId);

        return ResponseEntity.ok("Transaction deleted successfully.");
    }

    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<?> getTransactionById(
            @PathVariable String transactionId,
            Authentication auth) {

        User user = (User) auth.getPrincipal();
        String userId = user.getUserId();

        Transaction txn = txService.getTransactionById(userId, transactionId);

        // if (txn == null) {
        //     throw new ResourceNotFoundException("Transaction not found with ID: " + transactionId);
        // }

        return ResponseEntity.ok(txn);
    }
}
