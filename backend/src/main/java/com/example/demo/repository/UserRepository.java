package com.example.demo.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.demo.exception.DatabaseException;
import com.example.demo.model.User;

import io.github.cdimascio.dotenv.Dotenv;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;

@Repository
public class UserRepository {

        private static final Dotenv dotenv = Dotenv.configure().load();

        private static final String AWS_ACCESS_KEY = dotenv.get("AWS_ACCESS_KEY");
        private static final String AWS_SECRET_KEY = dotenv.get("AWS_SECRET_KEY");
        private static final Region AWS_REGION = Region.of(dotenv.get("AWS_REGION"));

        private static final String TABLE_NAME = "Users"; // replace with your table name
        // ==============================
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(AWS_ACCESS_KEY, AWS_SECRET_KEY);
        DynamoDbClient ddb = DynamoDbClient.builder()
                        .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                        .region(AWS_REGION)
                        .build();
        private final String tableName = TABLE_NAME;

        public void save(User user) {
                Map<String, AttributeValue> item = new HashMap<>();
                item.put("username", AttributeValue.builder().s(user.getUsername()).build());
                item.put("userId", AttributeValue.builder().s(user.getUserId()).build());
                item.put("passwordHash", AttributeValue.builder().s(user.getPasswordHash()).build());
                item.put("email", AttributeValue.builder().s(user.getEmail()).build());
                // item.put("monthlyGoal",
                // AttributeValue.builder().s(user.getMonthlyGoal()).build());
                PutItemRequest req = PutItemRequest.builder()
                                .tableName(tableName)
                                .item(item)
                                .build();
                ddb.putItem(req);
        }

        public boolean findByUsername(String username) {
                GetItemRequest req = GetItemRequest.builder()
                                .tableName(tableName)
                                .key(Map.of("username", AttributeValue.builder().s(username).build()))
                                .build();
                GetItemResponse resp = ddb.getItem(req);

                return !resp.item().isEmpty();
        }

        // public Optional<User> findByEmail(String email) {
        // GetItemRequest req = GetItemRequest.builder()
        // .tableName(tableName)
        // .key(Map.of("email", AttributeValue.builder().s(email).build()))
        // .build();
        // GetItemResponse resp = ddb.getItem(req);
        // if (!resp.hasItem() || resp.item().isEmpty())
        // return Optional.empty();
        // Map<String, AttributeValue> m = resp.item();
        // User u = new User();
        // u.setUserId(m.getOrDefault("userId",
        // AttributeValue.builder().s("").build()).s());
        // u.setUsername(m.get("username").s());
        // u.setPasswordHash(m.get("passwordHash").s());
        // u.setEmail(m.get("email").s());
        // // u.setMonthlyGoal(m.get("monthlyGoal").s());
        // return Optional.of(u);
        // }

        public Optional<User> findByEmail(String email) {

                try {
                        QueryRequest req = QueryRequest.builder()
                                        .tableName(tableName)
                                        .indexName("email-index")
                                        .keyConditionExpression("#e = :email")
                                        .expressionAttributeNames(Map.of("#e", "email"))
                                        .expressionAttributeValues(Map.of(":email",
                                                        AttributeValue.builder().s(email).build()))
                                        .build();

                        QueryResponse resp = ddb.query(req);

                        if (resp.count() == 0)
                                return Optional.empty();

                        Map<String, AttributeValue> m = resp.items().get(0);

                        User u = new User();
                        u.setUserId(m.get("userId").s());
                        u.setUsername(m.get("username").s());
                        u.setPasswordHash(m.get("passwordHash").s());
                        u.setEmail(m.get("email").s());

                        // handle number/string safely
                        if (m.containsKey("monthlyGoal") && m.get("monthlyGoal").n() != null) {
                                u.setMonthlyGoal(m.get("monthlyGoal").n());
                        }

                        return Optional.of(u);

                } catch (Exception e) {
                        e.printStackTrace(); // TEMP: See actual DynamoDB error in logs
                        throw new DatabaseException("Failed to find user by email: " + email);
                }
        }

        public Optional<User> findByUserId(String userId) {
                GetItemRequest req = GetItemRequest.builder()
                                .tableName(tableName)
                                .key(Map.of("userId", AttributeValue.builder().s(userId).build()))
                                .build();

                GetItemResponse resp = ddb.getItem(req);

                if (!resp.hasItem() || resp.item().isEmpty())
                        return Optional.empty();

                Map<String, AttributeValue> m = resp.item();

                User u = new User();
                u.setUserId(m.get("userId").s());
                u.setUsername(m.get("username").s());
                u.setPasswordHash(m.get("passwordHash").s());
                u.setEmail(m.get("email").s());
                u.setMonthlyGoal(
                                m.containsKey("monthlyGoal")
                                                ? m.get("monthlyGoal").s()
                                                : null);

                return Optional.of(u);
        }

        public void updateMonthlyGoalByUsername(String username, String monthlyGoal) {

                Map<String, AttributeValue> key = Map.of(
                                "username", AttributeValue.builder().s(username).build());

                Map<String, AttributeValue> updates = Map.of(
                                ":goal", AttributeValue.builder().s(monthlyGoal).build());

                UpdateItemRequest req = UpdateItemRequest.builder()
                                .tableName(tableName)
                                .key(key)
                                .updateExpression("SET monthlyGoal = :goal")
                                .expressionAttributeValues(updates)
                                .build();

                ddb.updateItem(req);
        }

}
