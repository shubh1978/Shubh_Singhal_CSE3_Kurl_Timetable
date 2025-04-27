package com.llt.school.erp.school.service.impl;

import com.llt.school.erp.campus.model.Campus;
import com.llt.school.erp.school.dto.request.CreateSchoolRequest;
import com.llt.school.erp.school.dto.request.DeleteSchoolRequest;
import com.llt.school.erp.school.dto.request.UpdateSchoolRequest;
import com.llt.school.erp.school.model.School;
import com.llt.school.erp.school.repository.SchoolRepository;
import com.llt.school.erp.school.service.SchoolService;
import com.llt.school.erp.teacher.model.Teacher;
import com.llt.school.erp.user.dto.request.SignupRequestDTO;
import com.llt.school.erp.user.dto.response.AuthToken;
import com.llt.school.erp.user.model.User;
import com.llt.school.erp.user.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class SchoolServiceImpl implements SchoolService {

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private AuthService authService;

    @Override
    public School createSchool(CreateSchoolRequest request) {
        SignupRequestDTO signupRequestDTO = new SignupRequestDTO();
        signupRequestDTO.setUsername(request.getAdminUsername());
        signupRequestDTO.setPassword(request.getAdminPassword());
        signupRequestDTO.setEmail(request.getAdminEmail());
        signupRequestDTO.setMobile(request.getAdminMobile());
        signupRequestDTO.setRole(User.Role.SCHOOL_ADMIN);
        signupRequestDTO.setFirstName(request.getFirstName());
        signupRequestDTO.setLastName(request.getLastName());
        signupRequestDTO.setShortName(request.getShortName());
        AuthToken authToken = authService.signup(signupRequestDTO);
        School school = School.builder()
                .name(request.getName())
                .email(request.getEmail())
                .admin((User) authToken.getAuthentication().getPrincipal())
                .address(request.getAddress())
                .mobile(request.getMobile())
                .createdOn(System.currentTimeMillis())
                .isSuspended(request.isSuspended())
                .build();

        return schoolRepository.save(school);
    }

    @Override
    public List<School> getAllSchools() {
        return schoolRepository.findAll();
    }

    @Override
    public List<School> getSchoolsByAdmin(User user) {
        return schoolRepository.findByAdmin(user);
    }

    @Override
    public School updateSchool(UpdateSchoolRequest request) {
        Optional<School> schoolOptional = null;
        if (request.getId() != null) {
            schoolOptional = schoolRepository.findById(request.getId());
        } else {
            throw new DataIntegrityViolationException("School with given ID does not exist");
        }

        School schoolToUpdate = null;

        if (schoolOptional.isPresent()) {
            schoolToUpdate = schoolOptional.get();
        } else {
            throw new DataIntegrityViolationException("School with given ID does not exist");
        }

        if (request.getName() != null && !request.getName().isBlank()) {
            schoolToUpdate.setName(request.getName());
        }

        if (request.getAddress() != null && !request.getAddress().isBlank()) {
            schoolToUpdate.setAddress(request.getAddress());
        }

        if (request.getMobile() != null && !request.getMobile().isBlank()) {
            schoolToUpdate.setMobile(request.getMobile());
        }

        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            schoolToUpdate.setEmail(request.getEmail());
        }

        schoolToUpdate.setSuspended(request.isSuspended());
        return schoolRepository.save(schoolToUpdate);
    }

    @Override
    public School deleteSchool(DeleteSchoolRequest request) {
        Optional<School> schoolOptional = null;
        if (request.getId() != null) {
            schoolOptional = schoolRepository.findById(request.getId());
        } else {
            throw new DataIntegrityViolationException("School with given ID does not exist");
        }

        School schoolToDelete = null;

        if (schoolOptional.isPresent()) {
            schoolToDelete = schoolOptional.get();
        } else {
            throw new DataIntegrityViolationException("School with given ID does not exist");
        }
        schoolRepository.delete(schoolToDelete);
        return null;
    }

    @Override
    public Campus findByAdmin(User user) {
        return null;
    }

    @Override
    public School suspend(UUID id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new DataIntegrityViolationException("School with given id not found"));

        school.setSuspended(true);
        return schoolRepository.save(school);

    }
}
