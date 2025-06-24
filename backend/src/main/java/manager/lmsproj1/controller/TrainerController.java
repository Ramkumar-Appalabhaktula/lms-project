package manager.lmsproj1.controller;

import manager.lmsproj1.entity.Trainer;
import manager.lmsproj1.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping("/register/{managerId}")
    public ResponseEntity<Trainer> registerTrainer(@RequestBody Trainer trainer, @PathVariable Long managerId) {
        try {
            Trainer savedTrainer = trainerService.registerTrainer(trainer, managerId);
            return ResponseEntity.ok(savedTrainer);
        } catch (Exception e) {
            throw new RuntimeException("Error registering trainer: " + e.getMessage(), e);
        }
    }
}