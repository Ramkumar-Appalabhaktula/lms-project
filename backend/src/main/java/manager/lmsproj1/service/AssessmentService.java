package manager.lmsproj1.service;

import manager.lmsproj1.entity.Assessment;
import manager.lmsproj1.entity.Paper;

import java.util.List;

public interface AssessmentService {
    Assessment saveAssessment(Assessment assessment, String trainerId);
    List<Assessment> getAssessmentsByTrainer(String trainerId);
    Assessment updateAssessment(String name, Assessment assessment);
    void deleteAssessment(String name);
    Assessment addPaper(String assessmentName, Paper paper);
}