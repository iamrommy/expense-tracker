package com.example.demo.repository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;

import org.springframework.stereotype.Repository;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Transaction;

import io.github.cdimascio.dotenv.Dotenv;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryResponse;

@Repository
public class TransactionRepository {

    private static final Dotenv dotenv = Dotenv.configure().load();

    private static final String AWS_ACCESS_KEY = dotenv.get("AWS_ACCESS_KEY");
    private static final String AWS_SECRET_KEY = dotenv.get("AWS_SECRET_KEY");
    private static final Region AWS_REGION = Region.of(dotenv.get("AWS_REGION"));

    AwsBasicCredentials awsCreds = AwsBasicCredentials.create(AWS_ACCESS_KEY, AWS_SECRET_KEY);
    DynamoDbClient ddb = DynamoDbClient.builder()
            .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
            .region(AWS_REGION)
            .build();
    private final String tableName = "Transactions";

    public void save(Transaction t) {
        Map<String, AttributeValue> item = new HashMap<>();
        item.put("userId", AttributeValue.builder().s(t.getUserId()).build());
        item.put("transactionId", AttributeValue.builder().s(t.getTransactionId()).build());
        item.put("type", AttributeValue.builder().s(t.getType()).build());
        item.put("amount", AttributeValue.builder().n(String.valueOf(t.getAmount())).build());
        item.put("description", AttributeValue.builder().s(t.getDescription()).build());
        item.put("category", AttributeValue.builder().s(t.getCategory()).build());
        item.put("timestamp", AttributeValue.builder().s(t.getTimestamp().toString()).build());
        item.put("currency", AttributeValue.builder().s(t.getCurrency().toString()).build());
        item.put("paymentMethod", AttributeValue.builder().s(t.getPaymentMethod().toString()).build());
        item.put("date", AttributeValue.builder().s(t.getDate().toString()).build());

        PutItemRequest req = PutItemRequest.builder().tableName(tableName).item(item).build();
        ddb.putItem(req);
    }

    public List<Transaction> findByUserId(String userId) {
        QueryRequest q = QueryRequest.builder()
                .tableName(tableName)
                .keyConditionExpression("userId = :u")
                .expressionAttributeValues(Map.of(":u", AttributeValue.builder().s(userId).build()))
                .build();
        QueryResponse resp = ddb.query(q);
        List<Transaction> list = new ArrayList<>();
        for (Map<String, AttributeValue> m : resp.items()) {
            Transaction t = new Transaction();
            t.setUserId(m.get("userId").s());
            t.setTransactionId(m.get("transactionId").s());
            t.setType(m.get("type").s());
            t.setAmount(Double.valueOf(m.get("amount").n()));
            t.setDescription(m.get("description").s());
            t.setCategory(m.get("category").s());
            t.setTimestamp(Instant.parse(m.get("timestamp").s()));
            t.setCurrency(m.get("currency").s());
            t.setPaymentMethod(m.get("paymentMethod").s());
            t.setDate(m.get("date").s());
            list.add(t);
        }
        return list;
    }

    public Transaction findByTransactionId(String userId, String transactionId) {

        Map<String, AttributeValue> key = Map.of(
                "userId", AttributeValue.builder().s(userId).build(),
                "transactionId", AttributeValue.builder().s(transactionId).build());

        var response = ddb.getItem(builder -> builder
                .tableName(tableName)
                .key(key));

        if (!response.hasItem()) {
            throw new ResourceNotFoundException("Transaction not found with ID: " + transactionId);
        }

        Map<String, AttributeValue> m = response.item();

        Transaction t = new Transaction();
        t.setUserId(m.get("userId").s());
        t.setTransactionId(m.get("transactionId").s());
        t.setType(m.get("type").s());
        t.setAmount(Double.valueOf(m.get("amount").n()));
        t.setDescription(m.get("description").s());
        t.setCategory(m.get("category").s());
        t.setTimestamp(Instant.parse(m.get("timestamp").s()));
        t.setCurrency(m.get("currency").s());
        t.setPaymentMethod(m.get("paymentMethod").s());
        t.setDate(m.get("date").s());

        return t;
    }

    public void update(Transaction t) {

        Map<String, AttributeValue> key = Map.of(
                "userId", AttributeValue.builder().s(t.getUserId()).build(),
                "transactionId", AttributeValue.builder().s(t.getTransactionId()).build());

        StringBuilder updateExp = new StringBuilder("SET ");
        Map<String, String> names = new HashMap<>();
        Map<String, AttributeValue> values = new HashMap<>();

        // helper lambda
        BiConsumer<String, Object> addField = (field, value) -> {
            if (value != null) {
                String placeholder = ":" + field;
                String nameKey = "#" + field;

                updateExp.append(nameKey).append(" = ").append(placeholder).append(", ");

                names.put(nameKey, field);

                if (value instanceof String s)
                    values.put(placeholder, AttributeValue.builder().s(s).build());
                else if (value instanceof Double d)
                    values.put(placeholder, AttributeValue.builder().n(d.toString()).build());
                else if (value instanceof Instant i)
                    values.put(placeholder, AttributeValue.builder().s(i.toString()).build());
            }
        };

        // add only NON-null fields
        addField.accept("type", t.getType());
        addField.accept("amount", t.getAmount());
        addField.accept("description", t.getDescription());
        addField.accept("category", t.getCategory());
        addField.accept("currency", t.getCurrency());
        addField.accept("paymentMethod", t.getPaymentMethod());
        addField.accept("timestamp", t.getTimestamp());
        addField.accept("date", t.getDate());

        // remove last comma
        String finalUpdateExp = updateExp.substring(0, updateExp.length() - 2);

        ddb.updateItem(builder -> builder
                .tableName(tableName)
                .key(key)
                .updateExpression(finalUpdateExp)
                .expressionAttributeNames(names)
                .expressionAttributeValues(values));
    }

    public void delete(String userId, String transactionId) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put("userId", AttributeValue.builder().s(userId).build());
        key.put("transactionId", AttributeValue.builder().s(transactionId).build());

        ddb.deleteItem(builder -> builder
                .tableName(tableName)
                .key(key));
    }

}
