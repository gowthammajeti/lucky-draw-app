package com.example.luckydraw.controller;

import com.example.luckydraw.model.DrawResult;
import com.example.luckydraw.model.Participant;
import com.example.luckydraw.service.DrawService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://lucky-frontend-700830052893.us-east1.run.app"
}) // allow frontend calls
public class LuckyController {

    // DTOs (records) for requests
    public record CreateParticipant(@NotBlank String name, @NotBlank String email) {}
    public record BulkRequest(List<CreateParticipant> participants) {}

    private final DrawService service;

    public LuckyController(DrawService service) {
        this.service = service;
    }

    // Health
    @GetMapping("/health")
    public String health() { return "ok"; }

    // Participants
    @PostMapping("/participants")
    @ResponseStatus(HttpStatus.CREATED)
    public Participant add(@RequestBody @Valid CreateParticipant body) {
        return service.add(body.name(), body.email());
    }

    @PostMapping("/participants/bulk")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Participant> addBulk(@RequestBody @Valid BulkRequest body) {
        return service.addBulk(body.participants());
    }

    @GetMapping("/participants")
    public List<Participant> list() { return service.list(); }

    @DeleteMapping("/participants/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) { service.deleteById(id); }

    @DeleteMapping("/participants")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAll() { service.deleteAll(); }

    // Draws
    @PostMapping("/draws")
    public DrawResult draw() { return service.drawOne(); }

    @GetMapping("/draws")
    public List<DrawResult> history() { return service.history(); }
}
