package com.llt.school.erp.school.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class CreateSchoolRequest {

    @NotBlank
    private String name;

    @Pattern(regexp = "^[0-9]*$", message = "Enter only digits")
    private String mobile;

    @Email
    private String email;

    @NotBlank
    private String address;

    @JsonProperty("admin_username")
    private String adminUsername;

    @JsonProperty("admin_password")
    private String adminPassword;

    @JsonProperty("admin_email")
    @Email
    private String adminEmail;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("short_name")
    private String shortName;

    private boolean isSuspended;

    @JsonProperty("admin_mobile")
    @Pattern(regexp = "^[0-9]*$", message = "Enter only digits in mobile number")
    private String adminMobile;

    private long createdOn;
}
