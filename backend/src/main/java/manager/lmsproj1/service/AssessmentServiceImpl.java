package manager.lmsproj1.service;

import manager.lmsproj1.entity.Assessment;
import manager.lmsproj1.entity.Paper;
import manager.lmsproj1.entity.Trainer;
import manager.lmsproj1.repository.AssessmentRepository;
import manager.lmsproj1.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssessmentServiceImpl implements AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public Assessment saveAssessment(Assessment assessment, String trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer not found with id: " + trainerId));
        assessment.setTrainer(trainer);
        return assessmentRepository.save(assessment);
    }

    @Override
    public List<Assessment> getAssessmentsByTrainer(String trainerId) {
        return assessmentRepository.findByTrainerTrainerId(trainerId);
    }

    @Override
    public Assessment updateAssessment(String name, Assessment assessment) {
        Assessment existing = assessmentRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("Assessment not found with name: " + name));
        existing.setType(assessment.getType());
        existing.setMcqCount(assessment.getMcqCount());
        existing.setProgramCount(assessment.getProgramCount());
        existing.setStatus(assessment.getStatus());
        return assessmentRepository.save(existing);
    }

    @Override
    public void deleteAssessment(String name) {
        Assessment existing = assessmentRepository.findById(name)
                .orElseThrow(() -> new RuntimeException("Assessment not found with name: " + name));
        assessmentRepository.delete(existing);
    }

    @Override
    public Assessment addPaper(String assessmentName, Paper paper) {
        Assessment assessment = assessmentRepository.findById(assessmentName)
                .orElseThrow(() -> new RuntimeException("Assessment not found with name: " + assessmentName));
        assessment.addPaper(paper);
        return assessmentRepository.save(assessment);
    }
}