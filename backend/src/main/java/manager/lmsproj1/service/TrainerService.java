//package manager.lmsproj1.service;
//
//import manager.lmsproj1.entity.Trainer;
//import java.util.List;
//
//public interface TrainerService {
//    Trainer registerTrainer(Trainer trainer, Long managerId);
//    Trainer getTrainerById(String trainerId);
//    List<Trainer> getAllTrainers();
//    Trainer updateTrainer(String trainerId, Trainer trainerDetails);
//    void deleteTrainer(String trainerId);
//}

package manager.lmsproj1.service;

import manager.lmsproj1.entity.Trainer;
import java.util.List;

public interface TrainerService {
    Trainer registerTrainer(Trainer trainer, Long managerId);
    Trainer getTrainerById(String trainerId);
    List<Trainer> getAllTrainers();
    Trainer updateTrainer(String trainerId, Trainer trainerDetails);
    void deleteTrainer(String trainerId);
    Trainer validateTrainerLogin(String trainerId, String email); // Add this method
	Trainer validateTrainerLogin(Object trainerId, Object email);
}