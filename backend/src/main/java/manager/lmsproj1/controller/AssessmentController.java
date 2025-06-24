package manager.lmsproj1.controller;

import manager.lmsproj1.entity.Assessment;
import manager.lmsproj1.entity.Paper;
import manager.lmsproj1.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<?> addAssessment(
            @RequestBody Assessment assessment,
            @RequestParam String trainerId) {
        try {
            Assessment saved = assessmentService.saveAssessment(assessment, trainerId);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAssessments(@RequestParam String trainerId) {
        try {
            List<Assessment> assessments = assessmentService.getAssessmentsByTrainer(trainerId);
            return ResponseEntity.ok(assessments);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{name}")
    public ResponseEntity<?> updateAssessment(
            @PathVariable String name,
            @RequestBody Assessment assessment) {
        try {
            Assessment updated = assessmentService.updateAssessment(name, assessment);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteAssessment(@PathVariable String name) {
        try {
            assessmentService.deleteAssessment(name);
            return ResponseEntity.ok("Assessment deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/{assessmentName}/papers")
    public ResponseEntity<?> addPaper(
            @PathVariable String assessmentName,
            @RequestBody Paper paper) {
        try {
            Assessment updated = assessmentService.addPaper(assessmentName, paper);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}