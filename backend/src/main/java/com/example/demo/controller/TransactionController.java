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
        String username = (String) auth.getPrincipal();
        // use username as userId in this demo, or map to userId from userstore
        t.setUserId(username);
        t.setTimestamp(Instant.now());
        var saved = txService.addTransaction(t);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions(Authentication auth) {
        String username = (String) auth.getPrincipal();
        var list = txService.getTransactionsForUser(username);
        return ResponseEntity.ok(list);
    }

    // UPDATE
    @PutMapping("/{transactionId}")
    public ResponseEntity<?> updateTransaction(
            @PathVariable String transactionId,
            @RequestBody Transaction t,
            Authentication auth) {

        String username = (String) auth.getPrincipal();

        // Enforce user ID and transactionId
        t.setUserId(username);
        t.setTransactionId(transactionId);

        txService.updateTransaction(t);
        return ResponseEntity.ok(t);
    }

    // DELETE
    @DeleteMapping("/{transactionId}")
    public ResponseEntity<?> deleteTransaction(
            @PathVariable String transactionId,
            Authentication auth) {

        String username = (String) auth.getPrincipal();
        txService.deleteTransaction(username, transactionId);

        return ResponseEntity.ok("Transaction deleted successfully.");
    }
}
