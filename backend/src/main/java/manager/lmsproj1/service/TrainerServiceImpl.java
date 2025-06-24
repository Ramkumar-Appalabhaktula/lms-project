package manager.lmsproj1.service.impl;

import manager.lmsproj1.entity.Manager;
import manager.lmsproj1.entity.Trainer;
import manager.lmsproj1.repository.ManagerRepository;
import manager.lmsproj1.repository.TrainerRepository;
import manager.lmsproj1.service.TrainerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TrainerServiceImpl implements TrainerService {

    private static final Logger logger = LoggerFactory.getLogger(TrainerServiceImpl.class);

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Override
    public Trainer registerTrainer(Trainer trainer, Long managerId) {
        Optional<Manager> optionalManager = managerRepository.findById(managerId);
        if (!optionalManager.isPresent()) {
            logger.error("Manager not found with id: {}", managerId);
            throw new RuntimeException("Manager not found with id: " + managerId);
        }
        trainer.setManager(optionalManager.get());
        try {
            Trainer savedTrainer = trainerRepository.save(trainer);
            logger.info("Trainer registered successfully: trainerId={}, email={}", trainer.getTrainerId(), trainer.getEmail());
            return savedTrainer;
        } catch (Exception e) {
            logger.error("Failed to register trainer: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to register trainer: " + e.getMessage(), e);
        }
    }
}