package com.example.demo.repository;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;

import org.springframework.stereotype.Repository;
import com.example.demo.model.User;

import io.github.cdimascio.dotenv.Dotenv;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class UserRepository {

    static Dotenv dotenv = Dotenv.configure().load();

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
        // item.put("monthlyGoal", AttributeValue.builder().s(user.getMonthlyGoal()).build());
        PutItemRequest req = PutItemRequest.builder()
                .tableName(tableName)
                .item(item)
                .build();
        ddb.putItem(req);
    }

    public Optional<User> findByUsername(String username) {
        GetItemRequest req = GetItemRequest.builder()
                .tableName(tableName)
                .key(Map.of("username", AttributeValue.builder().s(username).build()))
                .build();
        GetItemResponse resp = ddb.getItem(req);
        if (!resp.hasItem() || resp.item().isEmpty())
            return Optional.empty();
        Map<String, AttributeValue> m = resp.item();
        User u = new User();
        u.setUserId(m.getOrDefault("userId", AttributeValue.builder().s("").build()).s());
        u.setUsername(m.get("username").s());
        u.setPasswordHash(m.get("passwordHash").s());
        u.setEmail(m.get("email").s());
        // u.setMonthlyGoal(m.get("monthlyGoal").s());
        return Optional.of(u);
    }
}
