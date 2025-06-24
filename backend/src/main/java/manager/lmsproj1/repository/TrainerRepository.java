package manager.lmsproj1.repository;

import manager.lmsproj1.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerRepository extends JpaRepository<Trainer, String> {
}