package com.example.luckydraw.repo;

import com.example.luckydraw.model.DrawResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DrawResultRepo extends MongoRepository<DrawResult, String> {}
