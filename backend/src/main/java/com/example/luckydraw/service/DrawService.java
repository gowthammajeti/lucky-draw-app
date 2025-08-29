package com.example.luckydraw.service;

import com.example.luckydraw.model.DrawResult;
import com.example.luckydraw.model.Participant;
import com.example.luckydraw.repo.DrawResultRepo;
import com.example.luckydraw.repo.ParticipantRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class DrawService {
    private final ParticipantRepo participants;
    private final DrawResultRepo results;

    public DrawService(ParticipantRepo participants, DrawResultRepo results) {
        this.participants = participants;
        this.results = results;
    }

    public Participant add(String name) {
        return participants.save(new Participant(name));
    }

    public Participant add(String name, String email) {
        return participants.save(new Participant(name, email));
    }

    public List<Participant> addBulk(List<com.example.luckydraw.controller.LuckyController.CreateParticipant> requests) {
        // dedupe by email and skip blanks
        List<Participant> toSave = new java.util.ArrayList<>(
            requests.stream()
                .map(r -> new Participant(r.name() == null ? "" : r.name().trim(), r.email() == null ? "" : r.email().trim()))
                .filter(p -> !p.getName().isEmpty() && !p.getEmail().isEmpty())
                .collect(Collectors.toMap(Participant::getEmail, p -> p, (a, b) -> a))
                .values()
        );
        return participants.saveAll(toSave);
    }

    public List<Participant> list() {
        return participants.findAll();
    }

    public void deleteById(String id) {
        participants.deleteById(id);
    }

    public void deleteAll() {
        participants.deleteAll();
    }

    public DrawResult drawOne() {
        List<Participant> all = participants.findAll();
        if (all.isEmpty()) throw new IllegalStateException("No participants to draw from.");
        int i = ThreadLocalRandom.current().nextInt(all.size());
        Participant winner = all.get(i);
        return results.save(new DrawResult(winner.getId(), winner.getName()));
    }

    public List<DrawResult> history() {
        return results.findAll();
    }
}
