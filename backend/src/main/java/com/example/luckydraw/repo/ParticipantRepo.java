package com.example.luckydraw.repo;

import com.example.luckydraw.model.Participant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ParticipantRepo extends MongoRepository<Participant, String> {}
