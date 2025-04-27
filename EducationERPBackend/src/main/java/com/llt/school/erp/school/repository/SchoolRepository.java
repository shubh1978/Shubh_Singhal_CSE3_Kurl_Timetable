package com.llt.school.erp.school.repository;

import com.llt.school.erp.school.model.School;
import com.llt.school.erp.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SchoolRepository extends JpaRepository<School, UUID> {

    List<School> findByAdmin(User admin);

}
