package manager.lmsproj1.service;

import manager.lmsproj1.entity.Manager;

import java.util.List;
import java.util.Optional;

public interface ManagerService {
    Manager saveManager(Manager manager);
    List<Manager> getAllManagers();
    Optional<Manager> getById(Long id);
    Optional<Manager> getByEmployeeId(String employeeId);
    Optional<Manager> getByEmail(String email);
    boolean existsByEmployeeId(String employeeId);
    boolean existsByEmail(String email);
    void deleteById(Long id);
}
