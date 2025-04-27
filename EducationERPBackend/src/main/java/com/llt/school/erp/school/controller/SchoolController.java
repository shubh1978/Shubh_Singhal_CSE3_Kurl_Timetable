package com.llt.school.erp.school.controller;

import com.llt.school.erp.school.dto.request.CreateSchoolRequest;
import com.llt.school.erp.school.dto.request.DeleteSchoolRequest;
import com.llt.school.erp.school.dto.request.UpdateSchoolRequest;
import com.llt.school.erp.school.model.School;
import com.llt.school.erp.school.service.SchoolService;
import com.llt.school.erp.user.dto.response.BaseDataResponse;
import com.llt.school.erp.user.dto.response.BaseResponse;
import com.llt.school.erp.user.model.User;
import com.llt.school.erp.util.StringUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/school")
@Slf4j
@CrossOrigin
public class SchoolController {

    @Autowired
    private SchoolService schoolService;

    @PostMapping("/create")
    public ResponseEntity<Object> createSchool(@Valid @RequestBody CreateSchoolRequest request) {
        try {
            School school = schoolService.createSchool(request);
            return new ResponseEntity<>(new BaseDataResponse(StringUtil.SUCCESS, school), HttpStatus.OK);
        } catch (Exception e) {
            log.error(Arrays.toString(e.getStackTrace()));
            return ResponseEntity.internalServerError().body(new BaseResponse(StringUtil.FAILURE, e.getMessage()));
        }
    }

    @PostMapping("/list")
    public ResponseEntity<Object> listSchools() {
        try {
            List<School> schoolsList = schoolService.getAllSchools();
            return ResponseEntity.ok(new BaseDataResponse(StringUtil.SUCCESS, schoolsList));
        } catch (Exception e) {
            log.error(Arrays.toString(e.getStackTrace()));
            return ResponseEntity.internalServerError().body(new BaseResponse(StringUtil.FAILURE, e.getMessage()));
        }
    }

//    @PreAuthorize("hasRole('ROLE_SCHOOL_ADMIN')")
    @PostMapping("/list-by-admin")
    public ResponseEntity<Object> listSchoolsByAdmin(@AuthenticationPrincipal User user) {
        try {
            List<School> schoolsList = schoolService.getSchoolsByAdmin(user);
            return ResponseEntity.ok(new BaseDataResponse(StringUtil.SUCCESS, schoolsList));
        } catch (Exception e) {
            log.error(Arrays.toString(e.getStackTrace()));
            return ResponseEntity.internalServerError().body(new BaseResponse(StringUtil.FAILURE, e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateSchoolById(@Valid @RequestBody UpdateSchoolRequest request) {
        try {
            School school = schoolService.updateSchool(request);
            return ResponseEntity.ok(new BaseDataResponse(StringUtil.SUCCESS, school));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(new BaseResponse(StringUtil.FAILURE, "Bad Request"));
        } catch (Exception e) {
            log.error(Arrays.toString(e.getStackTrace()));
            return ResponseEntity.internalServerError().body(new BaseResponse(StringUtil.FAILURE, e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteSchoolById(@Valid @RequestBody DeleteSchoolRequest request) {
        try {
            School school = schoolService.deleteSchool(request);
            return ResponseEntity.ok(new BaseDataResponse(StringUtil.SUCCESS, school));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(new BaseResponse(StringUtil.FAILURE, "Bad Request"));
        } catch (Exception e) {
            log.error(Arrays.toString(e.getStackTrace()));
            return ResponseEntity.internalServerError().body(new BaseResponse(StringUtil.FAILURE, e.getMessage()));

        }
    }
}
