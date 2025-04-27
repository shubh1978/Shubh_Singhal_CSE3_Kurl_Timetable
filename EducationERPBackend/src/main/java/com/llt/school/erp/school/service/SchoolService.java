package com.llt.school.erp.school.service;

import com.llt.school.erp.campus.model.Campus;
import com.llt.school.erp.school.dto.request.CreateSchoolRequest;
import com.llt.school.erp.school.dto.request.DeleteSchoolRequest;
import com.llt.school.erp.school.dto.request.UpdateSchoolRequest;
import com.llt.school.erp.school.model.School;
import com.llt.school.erp.user.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface SchoolService {
    School createSchool(CreateSchoolRequest request);

    List<School> getAllSchools();

    List<School> getSchoolsByAdmin(User user);

    School updateSchool(UpdateSchoolRequest request);

    School deleteSchool(DeleteSchoolRequest request);

    Campus findByAdmin(User user);

    School suspend(UUID id);
}
