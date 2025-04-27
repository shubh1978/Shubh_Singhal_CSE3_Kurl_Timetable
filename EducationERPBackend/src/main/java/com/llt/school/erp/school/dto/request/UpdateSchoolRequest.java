package com.llt.school.erp.school.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.UUID;

@Data
public class UpdateSchoolRequest {

    private UUID id;

    private String name;

    @Pattern(regexp = "^[0-9]*$", message = "Enter only digits")
    private String mobile;

    @Email
    private String email;

    private boolean isSuspended;

    private String address;
}
