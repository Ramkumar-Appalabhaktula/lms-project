package manager.lmsproj1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manager.lmsproj1.entity.Manager;
import manager.lmsproj1.repository.ManagerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    @Override
    public Manager saveManager(Manager manager) {
        return managerRepository.save(manager);
    }

    @Override
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @Override
    public Optional<Manager> getById(Long id) {
        return managerRepository.findById(id);
    }

    @Override
    public Optional<Manager> getByEmployeeId(String employeeId) {
        return managerRepository.findByEmployeeId(employeeId);
    }

    @Override
    public Optional<Manager> getByEmail(String email) {
        return managerRepository.findByEmail(email);
    }

    @Override
    public boolean existsByEmployeeId(String employeeId) {
        return managerRepository.existsByEmployeeId(employeeId);
    }

    @Override
    public boolean existsByEmail(String email) {
        return managerRepository.existsByEmail(email);
    }

    @Override
    public void deleteById(Long id) {
        managerRepository.deleteById(id);
    }
}
