package manager.lmsproj1.controller;

import manager.lmsproj1.entity.Manager;
import manager.lmsproj1.service.ManagerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/managers")
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Manager manager) {
        if (managerService.existsByEmployeeId(manager.getEmployeeId())) {
            return ResponseEntity.badRequest().body("Employee ID already exists.");
        }
        if (managerService.existsByEmail(manager.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }
        managerService.saveManager(manager);
        return ResponseEntity.ok("Manager registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Manager loginRequest) {
        Optional<Manager> optional = managerService.getByEmployeeId(loginRequest.getEmployeeId());
        if (optional.isPresent()) {
            Manager manager = optional.get();
            if (manager.getEmail().equalsIgnoreCase(loginRequest.getEmail())) {
                return ResponseEntity.ok("Login successful.");
            } else {
                return ResponseEntity.status(401).body("Invalid email.");
            }
        } else {
            return ResponseEntity.status(404).body("Manager not found.");
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful.");
    }

    @GetMapping
    public List<Manager> getAllManagers() {
        return managerService.getAllManagers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable Long id) {
        return managerService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(""
    		+ "")
    public ResponseEntity<String> updateManager(@PathVariable Long id, @RequestBody Manager updatedManager) {
        Optional<Manager> optional = managerService.getById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(404).body("Manager not found.");
        }

        Manager existing = optional.get();

        if (managerService.existsByEmail(updatedManager.getEmail())
                && !existing.getEmail().equalsIgnoreCase(updatedManager.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use.");
        }

        if (managerService.existsByEmployeeId(updatedManager.getEmployeeId())
                && !existing.getEmployeeId().equalsIgnoreCase(updatedManager.getEmployeeId())) {
            return ResponseEntity.badRequest().body("Employee ID already in use.");
        }

        existing.setName(updatedManager.getName());
        existing.setEmail(updatedManager.getEmail());
        existing.setRole(updatedManager.getRole());
        existing.setStatus(updatedManager.getStatus());
        existing.setEmployeeId(updatedManager.getEmployeeId());

        managerService.saveManager(existing);
        return ResponseEntity.ok("Manager updated.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteManager(@PathVariable Long id) {
        if (managerService.getById(id).isPresent()) {
            managerService.deleteById(id);
            return ResponseEntity.ok("Manager deleted.");
        } else {
            return ResponseEntity.status(404).body("Manager not found.");
        }
    }
}
