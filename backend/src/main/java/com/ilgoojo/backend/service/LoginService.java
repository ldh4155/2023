package com.ilgoojo.backend.service;


import com.ilgoojo.backend.repository.LoginRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class LoginService {
    private LoginRepository loginRepository;

    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public boolean checkId(String userId) {
        return loginRepository.existsById(userId);
    }
}
