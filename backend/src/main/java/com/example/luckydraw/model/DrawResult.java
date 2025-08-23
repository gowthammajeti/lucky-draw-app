package com.example.luckydraw.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document("draw_results")
public class DrawResult {
    @Id
    private String id;

    private String winnerId;
    private String winnerName;
    private final Instant drawnAt = Instant.now();


    public DrawResult() {}

    public DrawResult(String winnerId, String winnerName) {
        this.winnerId = winnerId;
        this.winnerName = winnerName;
    }

    public String getId() { return id; }
    public String getWinnerId() { return winnerId; }
    public String getWinnerName() { return winnerName; }
    public Instant getDrawnAt() { return drawnAt; }
}
