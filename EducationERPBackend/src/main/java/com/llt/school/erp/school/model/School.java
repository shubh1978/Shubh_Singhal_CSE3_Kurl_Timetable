package com.llt.school.erp.school.model;

import com.llt.school.erp.user.model.User;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class School {

    @Id
    @Builder.Default
    private UUID id = UUID.randomUUID();

    private String name;

    private String mobile;

    private String email;

    private String address;

    private boolean isSuspended;

    @OneToOne
    private User admin;

    private long createdOn;
}
