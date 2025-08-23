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

    public Participant() {}

    public Participant(String name) {
        this.name = name;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
