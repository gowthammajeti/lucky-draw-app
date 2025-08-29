package com.example.luckydraw.model;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("participants")
public class Participant {
    @Id
    private String id;

    @NotBlank
    @Indexed(unique = true)
    private String name;

    @Indexed(unique = true)
    private String email;

    public Participant() {}

    public Participant(String name) {
        this.name = name;
    }

    public Participant(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
